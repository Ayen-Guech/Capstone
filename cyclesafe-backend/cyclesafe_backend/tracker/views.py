import os
import json
import random
import openai
from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from dotenv import load_dotenv
from django.contrib.auth.models import User
from .models import CycleRecord
from users.models import UserProfile  # ✅ user profile with phone and sms fields
from .tasks import send_sms_reminder, send_welcome_message, schedule_cycle_reminders  # ✅ Celery tasks

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


class SmartCyclePredictor(APIView):
    """
    Predicts the user's next period, ovulation, and fertile window.
    Stores cycle data, cycle length, and optional phone info for SMS reminders.
    Produces clean, readable AI summaries that address the user by name.
    Sends welcome and summary messages on first use.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            user_message = request.data.get("message")
            manual_cycle = request.data.get("cycle_length")
            phone_number = request.data.get("phone_number")
            allow_sms = request.data.get("allow_sms", False)

            if not user_message:
                return Response(
                    {"error": "Message field is required."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # 🧠 STEP 1: Extract structured data with GPT
            extract_prompt = f"""
            You are a women's health assistant.
            Extract structured period data from this message:
            "{user_message}"

            Return only valid JSON in this exact format:
            {{
              "start_date": "YYYY-MM-DD",
              "end_date": "YYYY-MM-DD",
              "cycle_length": 28
            }}

            If the user did not mention their cycle length, leave it null.
            """

            ai_response = openai.chat.completions.create(
                model="gpt-4.1",
                messages=[{"role": "system", "content": extract_prompt}],
            )

            raw_output = ai_response.choices[0].message.content.strip()

            try:
                cleaned_output = raw_output.strip().split("```")[-1].strip()
                ai_data = json.loads(cleaned_output)
            except json.JSONDecodeError:
                return Response(
                    {"error": "AI returned invalid JSON.", "raw_output": raw_output},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            start_str = ai_data.get("start_date")
            end_str = ai_data.get("end_date")
            ai_cycle_length = ai_data.get("cycle_length")

            if not start_str or not end_str:
                return Response(
                    {"error": "Missing start or end date."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            start_date = datetime.strptime(start_str, "%Y-%m-%d").date()
            end_date = datetime.strptime(end_str, "%Y-%m-%d").date()

            if end_date < start_date:
                return Response(
                    {"error": "End date cannot be before start date."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # 🧮 STEP 2: Determine cycle length intelligently
            if manual_cycle:
                cycle_length = int(manual_cycle)
            elif ai_cycle_length:
                cycle_length = int(ai_cycle_length)
            else:
                prev_cycles = CycleRecord.objects.filter(user=user).order_by("-start_date")[:3]
                if len(prev_cycles) >= 2:
                    diffs = [
                        (prev_cycles[i].start_date - prev_cycles[i + 1].start_date).days
                        for i in range(len(prev_cycles) - 1)
                        if (prev_cycles[i].start_date - prev_cycles[i + 1].start_date).days > 0
                    ]
                    cycle_length = round(sum(diffs) / len(diffs)) if diffs else random.randint(25, 28)
                else:
                    cycle_length = random.randint(25, 28)

            # 💾 STEP 3: Save cycle record
            record = CycleRecord.objects.create(
                user=user,
                start_date=start_date,
                end_date=end_date,
                cycle_length=cycle_length,
            )

            # 🧍‍♀️ STEP 4: Save user profile info
            profile, _ = UserProfile.objects.get_or_create(user=user)
            if phone_number:
                profile.phone_number = phone_number
            profile.allow_sms = bool(allow_sms)
            profile.save()

            # 📅 STEP 5: Predict main phases
            next_period = start_date + timedelta(days=cycle_length)
            ovulation_day = start_date + timedelta(days=cycle_length - 14)
            fertile_start = ovulation_day - timedelta(days=5)
            fertile_end = ovulation_day + timedelta(days=1)
            fertile_window = f"{fertile_start.strftime('%b %d')} – {fertile_end.strftime('%b %d')}"

            menstrual_end = end_date
            follicular_start = end_date + timedelta(days=1)
            follicular_end = ovulation_day - timedelta(days=1)
            luteal_start = ovulation_day + timedelta(days=1)
            luteal_end = next_period - timedelta(days=1)

            # 🤖 STEP 6: Personalized AI summary
            user_name = user.first_name or user.username
            summary_prompt = f"""
            You are a kind and professional women's health assistant.
            The user's name is {user_name}.
            Their last period was from {start_date} to {end_date}.
            Cycle length: {cycle_length} days.
            Next period: {next_period}.
            Ovulation: {ovulation_day}.
            Fertile window: {fertile_window}.

            Phases:
            Menstrual Phase: {start_date} to {menstrual_end}
            Follicular Phase: {follicular_start} to {follicular_end}
            Ovulation Phase: {ovulation_day}
            Luteal Phase: {luteal_start} to {luteal_end}

            Write a warm, personalized summary beginning with:
            "Hey {user_name}, here’s your personalized cycle summary."
            Then describe what’s happening in each phase using clear, natural paragraphs.
            Include how energy, mood, fertility, and hormones change.
            Avoid emojis, markdown, bullet points, or complex formatting.
            Keep it concise and suitable for mobile app display.
            """

            ai_summary = openai.chat.completions.create(
                model="gpt-4.1",
                messages=[
                    {"role": "system", "content": "You are a supportive, concise, and accurate women's health guide."},
                    {"role": "user", "content": summary_prompt},
                ],
            )

            summary_text = ai_summary.choices[0].message.content.strip()

            # 📲 STEP 7: Send Welcome or Summary SMS + Schedule Reminders
            if profile.allow_sms:
                previous_records = CycleRecord.objects.filter(user=user).count()

                test_mode = os.getenv("TEST_MODE", "False").lower() == "true"
                phone = profile.phone_number

                if test_mode:
                    print(f"[TEST MODE] Would send SMS to {phone}: {summary_text}")
                else:
                    if previous_records <= 1:
                        # Send welcome + summary message
                        send_welcome_message.delay(user.id, summary_text)
                    else:
                        # Returning user — send only summary
                        summary_message = (
                            f"Hey {user_name}, here’s your updated cycle summary 🌼\n\n{summary_text}"
                        )
                        send_sms_reminder.delay(user.id, summary_message)

                    # Schedule reminders for period and ovulation
                    schedule_cycle_reminders.delay(user.id, str(next_period), str(ovulation_day))

            # ✅ STEP 8: Return structured clean response
            return Response(
                {
                    "user": user.username,
                    "cycle_length": cycle_length,
                    "next_period": next_period,
                    "ovulation": ovulation_day,
                    "fertile_window": fertile_window,
                    "phases": {
                        "menstrual": f"{start_date} – {menstrual_end}",
                        "follicular": f"{follicular_start} – {follicular_end}",
                        "ovulation": str(ovulation_day),
                        "luteal": f"{luteal_start} – {luteal_end}",
                    },
                    "message": summary_text,
                    "phone_number": profile.phone_number,
                    "allow_sms": profile.allow_sms,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            print("❌ Error in SmartCyclePredictor:", str(e))
            return Response({"error": str(e)}, status=500)
