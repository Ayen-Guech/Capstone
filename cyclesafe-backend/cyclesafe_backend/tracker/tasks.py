# tracker/tasks.py
from celery import shared_task
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
from datetime import datetime, timedelta
from django.utils import timezone
import os
from users.models import UserProfile
from django.contrib.auth.models import User
import math
import logging
import random

logger = logging.getLogger(__name__)

# ---------- CONFIG ----------
BRAND_NAME = os.getenv("BRAND_NAME", "CycleSafe")
TRIAL_MODE = os.getenv("TWILIO_TRIAL", "false").lower() in ("1", "true", "yes")
TRIAL_MAX_CHARS = int(os.getenv("TRIAL_MAX_CHARS", "150"))
NONTRIAL_SEGMENT_LENGTH = int(os.getenv("NONTRIAL_SEGMENT_LENGTH", "1500"))


# ---------- Helpers ----------

def _get_twilio_client():
    sid = os.getenv("TWILIO_ACCOUNT_SID")
    token = os.getenv("TWILIO_AUTH_TOKEN")
    if not sid or not token:
        raise RuntimeError("Twilio credentials are not configured in environment.")
    return Client(sid, token)


def _normalize_phone(phone: str) -> str | None:
    if not phone:
        return None
    p = phone.strip().replace(" ", "").replace("-", "")
    if p.startswith("00"):
        p = "+" + p[2:]
    if not p.startswith("+"):
        p = "+" + p
    digits = ''.join(ch for ch in p if ch.isdigit())
    return p if len(digits) >= 9 else None


def _send_once(to: str, body: str) -> str:
    client = _get_twilio_client()
    from_number = os.getenv("TWILIO_PHONE_NUMBER")
    if not from_number:
        raise RuntimeError("TWILIO_PHONE_NUMBER not set")
    msg = client.messages.create(body=body, from_=from_number, to=to)
    return msg.sid


def _split_and_send(to: str, body: str) -> list:
    """Send body to `to`. If TRIAL_MODE truncate; otherwise split into chunks if too long."""
    sids = []
    if TRIAL_MODE:
        if len(body) > TRIAL_MAX_CHARS:
            logger.debug("TRIAL_MODE: truncating message from %d to %d chars", len(body), TRIAL_MAX_CHARS)
            body = body[: TRIAL_MAX_CHARS - 3] + "..."
        sid = _send_once(to, body)
        sids.append(sid)
        return sids

    # production: split into segments if needed
    if len(body) <= NONTRIAL_SEGMENT_LENGTH:
        sids.append(_send_once(to, body))
        return sids

    total = len(body)
    chunks = math.ceil(total / NONTRIAL_SEGMENT_LENGTH)
    for i in range(chunks):
        start = i * NONTRIAL_SEGMENT_LENGTH
        end = start + NONTRIAL_SEGMENT_LENGTH
        chunk = body[start:end]
        sids.append(_send_once(to, chunk))
    return sids


# ---------- Tasks ----------

@shared_task(bind=True)
def send_sms_reminder(self, user_id, message):
    """
    Sends an SMS to the user if allowed. Adds a brand prefix and handles trial/prod limits.
    Returns a status string for logging.
    """
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return f"❌ User id {user_id} not found"

    try:
        profile = UserProfile.objects.get(user=user)
    except UserProfile.DoesNotExist:
        return f"❌ UserProfile for {user.username} not found"

    if not (profile.allow_sms and profile.phone_number):
        return f"❌ SMS disabled or missing number for {user.username}"

    to = _normalize_phone(profile.phone_number)
    if not to:
        return f"❌ Invalid phone number for {user.username}: {profile.phone_number}"

    branded = f"💗 [{BRAND_NAME}]\n{message}"

    try:
        sids = _split_and_send(to, branded)
        logger.info("SMS sent to %s (messages=%d)", to, len(sids))
        return f"✅ SMS sent to {to}"
    except TwilioRestException as e:
        logger.exception("Twilio error sending SMS to %s: %s", to, e)
        return f"❌ Twilio error: {getattr(e, 'code', 'N/A')} - {str(e)}"
    except Exception as e:
        logger.exception("Unexpected error sending SMS to %s: %s", to, e)
        return f"❌ SMS send failed: {e}"


@shared_task(bind=True)
def send_welcome_message(self, user_id, summary_message):
    """
    Sends a warm welcome plus the user's first summary. Delegates actual sending to send_sms_reminder.
    """
    try:
        user = User.objects.get(id=user_id)
        profile = UserProfile.objects.get(user=user)
    except (User.DoesNotExist, UserProfile.DoesNotExist):
        return f"❌ User or profile not found for id {user_id}"

    if not (profile.allow_sms and profile.phone_number):
        return f"❌ SMS disabled or missing number for {user.username}"

    first_name = user.first_name or user.username
    message = (
        f"🌸 Welcome to {BRAND_NAME}, {first_name}!\n\n"
        "We’re excited to support you in understanding your cycle better.\n\n"
        f"{summary_message}\n\n"
        "We’ll send helpful reminders before your next period and ovulation. 💕"
    )

    # queue the actual SMS send (this will truncate if TRIAL_MODE)
    send_sms_reminder.delay(user_id, message)
    logger.info("Queued welcome message for user %s", user.username)
    return f"✅ Welcome + summary queued for {profile.phone_number}"


@shared_task(bind=True)
def schedule_cycle_reminders(self, user_id, next_period_iso, ovulation_iso):
    """
    Schedules SMS reminders for period and ovulation only if reminder times are in the future.
    next_period_iso and ovulation_iso: ISO date strings (YYYY-MM-DD or full ISO datetime).
    """
    def _parse_iso(s: str) -> datetime:
        try:
            dt = datetime.fromisoformat(s)
        except Exception:
            # try date-only fallback
            dt = datetime.fromisoformat(s + "T00:00:00")
        if dt.tzinfo is None:
            dt = timezone.make_aware(dt, timezone.get_default_timezone())
        return dt

    try:
        next_period_dt = _parse_iso(next_period_iso)
        ovulation_dt = _parse_iso(ovulation_iso)
    except Exception as e:
        logger.exception("Invalid date format in schedule_cycle_reminders: %s", e)
        return f"❌ Invalid date format: {e}"

    now = timezone.now()

    try:
        profile = UserProfile.objects.get(user_id=user_id)
    except UserProfile.DoesNotExist:
        return f"❌ UserProfile not found for user {user_id}"

    if not profile.allow_sms:
        return f"❌ SMS disabled for user {user_id}"

    # prepare messages
    period_msg = (
        "Your period is expected in 2 days. Prepare pads, rest, and stay hydrated."
    )
    ovulation_msg = (
        "Your ovulation is coming in 2 days — this is a fertile window. Take care!"
    )

    # schedule period reminder if it's in the future
    eta_period = next_period_dt - timedelta(days=2)
    if eta_period > now:
        send_sms_reminder.apply_async((user_id, period_msg), eta=eta_period)
        logger.info("Scheduled period reminder for user %s at %s", user_id, eta_period)
    else:
        logger.info("Skipped scheduling past period reminder for user %s (eta %s <= now %s)", user_id, eta_period, now)

    # schedule ovulation reminder if it's in the future
    eta_ovulation = ovulation_dt - timedelta(days=2)
    if eta_ovulation > now:
        send_sms_reminder.apply_async((user_id, ovulation_msg), eta=eta_ovulation)
        logger.info("Scheduled ovulation reminder for user %s at %s", user_id, eta_ovulation)
    else:
        logger.info("Skipped scheduling past ovulation reminder for user %s (eta %s <= now %s)", user_id, eta_ovulation, now)

    return f"✅ Scheduled future reminders for user {user_id}"


# ============================================================
# 🕒 DAILY REMINDER CHECK — runs via Celery Beat every morning
# ============================================================

@shared_task(bind=True)
def check_and_send_daily_reminders(self):
    """
    Daily check to remind users of upcoming periods or ovulation.
    Runs automatically via Celery Beat (configured in celery.py).
    """
    now = timezone.now().date()
    two_days_ahead = now + timedelta(days=2)

    users = UserProfile.objects.filter(allow_sms=True, phone_number__isnull=False)

    for profile in users:
        user = profile.user
        try:
            # fields expected on UserProfile: next_period_date, next_ovulation_date
            next_period = getattr(profile, "next_period_date", None)
            ovulation = getattr(profile, "next_ovulation_date", None)

            if not next_period and not ovulation:
                continue

            # Normalize to date only if datetimes
            if next_period and hasattr(next_period, "date"):
                next_period = next_period.date()
            if ovulation and hasattr(ovulation, "date"):
                ovulation = ovulation.date()

            # 💗 If period is exactly in 2 days
            if next_period == two_days_ahead:
                msg = (
                    f"Hey {user.first_name or user.username}, your period is expected in 2 days 💗\n"
                    "Remember to rest, stay hydrated, and keep your pads ready!"
                )
                send_sms_reminder.delay(user.id, msg)
                logger.info("Sent period reminder to %s", profile.phone_number)

            # 🌸 If ovulation is exactly in 2 days
            if ovulation == two_days_ahead:
                msg = (
                    f"Hey {user.first_name or user.username}, your ovulation is in 2 days 🌼\n"
                    "This is your fertile phase — take care and listen to your body 💕"
                )
                send_sms_reminder.delay(user.id, msg)
                logger.info("Sent ovulation reminder to %s", profile.phone_number)

        except Exception as e:
            logger.error("Error processing reminders for %s: %s", profile.phone_number, e)

    logger.info("Daily reminder check completed.")
    return "✅ Daily reminders processed."


# ============================================================
# 🌼 WEEKLY HEALTH TIP — runs every Sunday morning (configured in celery.py)
# ============================================================

@shared_task(bind=True)
def send_weekly_health_tip(self):
    """
    Sends a motivational or educational tip about women’s health to all users.
    """
    tips = [
        "💧 Stay hydrated! Drinking enough water supports hormone balance.",
        "🌸 Gentle exercise can reduce cramps and improve mood.",
        "🍎 Include iron-rich foods after your period to replenish energy.",
        "🧘‍♀️ Mindfulness and rest help regulate your cycle.",
        "💤 Prioritize sleep — it supports hormonal health.",
    ]
    tip = random.choice(tips)

    users = UserProfile.objects.filter(allow_sms=True, phone_number__isnull=False)
    count = 0
    for profile in users:
        try:
            user = profile.user
            message = (
                f"💗 [{BRAND_NAME} Weekly Tip]\n"
                f"Hi {user.first_name or user.username}, here’s your health reminder:\n\n{tip}"
            )
            send_sms_reminder.delay(user.id, message)
            count += 1
        except Exception as e:
            logger.error("Failed to queue weekly tip for %s: %s", profile.phone_number, e)

    logger.info("Sent weekly tips to %d users.", count)
    return f"✅ Sent weekly tips to {count} users."
