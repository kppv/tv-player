from fastapi import Depends, HTTPException
from fastapi.security.api_key import APIKeyCookie

from src.core import jwt
from src.core.user import UserDto

auth_security = APIKeyCookie(name="JWT")


async def _is_authenticated(
    token: str = Depends(auth_security),
):
    user = jwt.decode_jwt(token)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return user


is_authenticated = Depends(_is_authenticated)


def get_current_user(current_user: UserDto = Depends(_is_authenticated)):
    return current_user
