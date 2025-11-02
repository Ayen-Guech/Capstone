import os
from twilio.rest import Client
from dotenv import load_dotenv

# ✅ Load environment variables
load_dotenv()

def send_test_sms():
    """Send a one-time Twilio test message."""
    # Read from .env
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    twilio_number = os.getenv("TWILIO_PHONE_NUMBER")

    # 🟢 Replace this with your real phone number in E.164 format
    test_number = "+250792403033"  # e.g. +250792403033

    client = Client(account_sid, auth_token)

    message = client.messages.create(
        body="Hey! 🌸 This is a real-time Twilio test message from CycleSafe — your setup works perfectly!",
        from_=twilio_number,
        to=test_number,
    )

    print(f"✅ Message sent! SID: {message.sid}")

if __name__ == "__main__":
    send_test_sms()
