#!/bin/bash
echo "🚀 Starting CycleSafe Backend Services..."

# 1️⃣ Start Celery Worker
echo "⚙️ Starting Celery Worker..."
celery -A cyclesafe_backend worker -l info --pool=solo &

# 2️⃣ Start Celery Beat
echo "⏰ Starting Celery Beat..."
celery -A cyclesafe_backend beat -l info &

# 3️⃣ Start Django Server
echo "🖥️ Starting Django Server..."
python manage.py runserver
