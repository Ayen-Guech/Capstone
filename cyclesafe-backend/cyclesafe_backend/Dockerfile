# ==========================
# Django Backend Dockerfile (MySQL Fixed)
# ==========================
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies
# - build-essential: compilers for C extensions
# - pkg-config: needed for mysqlclient build
# - default-libmysqlclient-dev: MySQL headers/libs
# - curl: useful for debugging or health checks
RUN apt-get update && \
    apt-get install -y \
        build-essential \
        pkg-config \
        default-libmysqlclient-dev \
        curl && \
    rm -rf /var/lib/apt/lists/*

# Copy dependencies and install Python packages
COPY requirements.txt .
RUN pip install --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Copy entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/app/entrypoint.sh"]
