from fastapi_camelcase import CamelModel


class UserDto(CamelModel):
    login: str
    first_name: str
    default_avatar_id: str
