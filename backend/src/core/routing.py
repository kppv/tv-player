from src.user.user_controller import user_router


def init_routing(app):
    from src.core.auth_controller import auth_router
    from src.catalog.catalog_controller import catalog_router

    for router in (auth_router, catalog_router, user_router):
        app.include_router(router)
