from datetime import datetime, timedelta, timezone

from jose import jwt

from src.core.user import UserDto

SECRET_KEY = "secret_secret"
ALGORITHM = "HS256"


def encode_jwt(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_jwt(token: str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return UserDto(**payload)
