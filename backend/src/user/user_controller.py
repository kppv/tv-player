from fastapi import Depends

from src.core.router_factory import api_router_factory
from src.core.security import get_current_user
from src.core.user import UserDto

user_router = api_router_factory("user", is_secured=True)


@user_router.get("/current")
async def get(current_user: UserDto = Depends(get_current_user)):
    return current_user
