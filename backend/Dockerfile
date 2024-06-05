FROM python:3.10-slim-bullseye

ARG APP_NAME=tv-player
ENV \
    # Keeps Python from generating .pyc files in the container
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100

RUN apt-get update && \
    apt-get install -y --no-install-recommends curl libpq-dev gcc libc6-dev build-essential && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /${APP_NAME}

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY .. .

ENV PYTHONPATH=/${APP_NAME}

CMD ["gunicorn", "src.main:app", "--bind", "0.0.0.0:8000"]