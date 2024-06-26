import os

from src.core.router_factory import api_router_factory
from src.core.settings import settings

catalog_router = api_router_factory("catalog", is_secured=True)


@catalog_router.get("/list")
async def get(path: str):
    base_directory_path = settings.video_path
    directory_path = f"{base_directory_path}{path}"
    file_list = []

    listdir = os.listdir(directory_path)
    listdir.sort()

    for item in listdir:
        if item.startswith("."):
            continue
        full_path = os.path.join(directory_path, item)
        file_dto = {
            "name": item,
            "is_file": os.path.isfile(full_path),
            "path": full_path.replace(base_directory_path, ""),
        }
        file_list.append(file_dto)

    return file_list
