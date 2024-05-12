from typing import Iterable

from fastapi import APIRouter

from src.core.security import is_authenticated


def api_router_factory(
    postfix: str,
    is_secured: bool = False,
    dependencies: Iterable = None,
    api_prefix: str = "/api/",
) -> APIRouter:
    dependencies_ = []

    if is_secured:
        dependencies_.append(is_authenticated)

    if dependencies:
        dependencies_.append(*dependencies)

    return APIRouter(
        prefix=f"{api_prefix}{postfix}",
        tags=[postfix.replace("_", "-")],
        dependencies=dependencies_,
    )
