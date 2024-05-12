from datetime import timedelta, datetime, timezone

import requests
from fastapi import HTTPException
from fastapi import Response

from src.core import jwt
from src.core.router_factory import api_router_factory
from src.core.user import UserDto

auth_router = api_router_factory("auth")


@auth_router.post("/login")
async def login(access_token: str, response: Response):
    user = get_yandex_data(access_token)
    expiration_time = datetime.now(timezone.utc) + timedelta(days=30)
    response.set_cookie(
        key="JWT", value=jwt.encode_jwt(user.dict()), expires=expiration_time
    )
    return user


def get_yandex_data(access_token: str) -> UserDto:
    url = f"https://login.yandex.ru/info?oauth_token={access_token}"
    response = requests.get(url)
    if response.status_code == 200:
        return UserDto(**response.json())
    raise HTTPException(status_code=401, detail="Unauthorized")
