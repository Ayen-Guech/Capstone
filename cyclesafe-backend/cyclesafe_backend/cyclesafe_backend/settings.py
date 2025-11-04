import os
from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv
import dj_database_url

# ------------------------------------------
# 🏗 Base directory
# ------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# ------------------------------------------
# 🔐 Load .env file
# ------------------------------------------
env_path = BASE_DIR / ".env"
if env_path.exists():
    load_dotenv(env_path)

# ------------------------------------------
# ⚙️ Basic Settings
# ------------------------------------------
SECRET_KEY = os.getenv("SECRET_KEY", "unsafe-default-key")
DEBUG = os.getenv("DEBUG", "True") == "True"

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "cyclesafe.onrender.com",
    "cyclesafe-frontend.vercel.app",
]

CSRF_TRUSTED_ORIGINS = [
    "https://cyclesafe.onrender.com",
    "https://capstone-virid-nu.vercel.app/",
]

# ------------------------------------------
# 🌐 CORS
# ------------------------------------------
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "https://capstone-virid-nu.vercel.app/",
    "https://cyclesafe.onrender.com",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
# Optional for development only:
# CORS_ALLOW_ALL_ORIGINS = True

# ------------------------------------------
# 🧩 Installed Apps
# ------------------------------------------
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third-party
    "rest_framework",
    "corsheaders",
    "rest_framework_api_key",

    # Local apps
    "users",
    "tracker",
    "proxy",
    "blog",
]

# ------------------------------------------
# 🧱 Middleware
# ------------------------------------------
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "cyclesafe_backend.urls"

# ------------------------------------------
# 🎨 Templates
# ------------------------------------------
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "cyclesafe_backend.wsgi.application"

# ------------------------------------------
# 🔑 Authentication / JWT
# ------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=2),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "AUTH_HEADER_TYPES": ("Bearer",),
}

# ------------------------------------------
# 🗄️ Database
# ------------------------------------------
DATABASES = {
    "default": dj_database_url.parse(
        os.getenv(
            "DATABASE_URL",
            "postgresql://capstonedata_user:mfHAJVkYtvaLWzfWMxfrrexpNkVnmIvM@dpg-d43p3o6uk2gs739bpt4g-a.oregon-postgres.render.com/capstonedata"
        ),
        conn_max_age=600,
    )
}

# ------------------------------------------
# 🌍 Internationalization
# ------------------------------------------
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# ------------------------------------------
# 📁 Static & Media
# ------------------------------------------
STATIC_URL = "static/"
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# ------------------------------------------
# ⚙️ Celery & Redis
# ------------------------------------------
CELERY_BROKER_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
CELERY_RESULT_BACKEND = os.getenv("REDIS_URL", "redis://localhost:6379/0")

CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
CELERY_TIMEZONE = "Africa/Nairobi"

# ------------------------------------------
# 🤖 External APIs
# ------------------------------------------
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# ------------------------------------------
# 🧩 React (optional for local dev only)
# ------------------------------------------
# These are only used if you serve React from Django (not in Render + Vercel)
TEMPLATES[0]["DIRS"] = [
    os.path.join(BASE_DIR.parent.parent, "cyclesafe-frontend", "frontend", "dist")
]

STATICFILES_DIRS = [
    os.path.join(BASE_DIR.parent.parent, "cyclesafe-frontend", "frontend", "dist", "assets")
]

# ------------------------------------------
# 🔑 Default Auto Field
# ------------------------------------------
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
