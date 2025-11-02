# cyclesafe_backend/celery.py
import os
from celery import Celery
from celery.schedules import crontab
from django.conf import settings

# ----------------------------------------------------
# 🌸 Basic Celery Configuration
# ----------------------------------------------------
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cyclesafe_backend.settings")

app = Celery("cyclesafe_backend")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()


# ----------------------------------------------------
# 🕒 Celery Beat — Scheduled (Periodic) Tasks
# ----------------------------------------------------
# These run automatically based on a schedule
app.conf.beat_schedule = {
    # ✅ 1. Check daily reminders at 8 AM
    "check-daily-cycle-reminders": {
        "task": "tracker.tasks.check_and_send_daily_reminders",
        "schedule": crontab(hour=8, minute=0),  # every day at 8:00 AM
    },

    # ✅ 2. (Optional) Weekly health tips every Sunday at 9 AM
    "send-weekly-health-tip": {
        "task": "tracker.tasks.send_weekly_health_tip",
        "schedule": crontab(hour=9, minute=0, day_of_week="sun"),
    },
}


# ----------------------------------------------------
# 🌍 Timezone & Settings
# ----------------------------------------------------
app.conf.timezone = getattr(settings, "TIME_ZONE", "Africa/Kigali")
app.conf.enable_utc = False

# ----------------------------------------------------
# 🪶 Optional: Debugging hook
# ----------------------------------------------------
@app.task(bind=True)
def debug_task(self):
    print(f"🔍 Request: {self.request!r}")
