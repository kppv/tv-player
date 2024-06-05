from fastapi import WebSocket, WebSocketDisconnect

from src.core.router_factory import ws_router_factory
from src.manager.ws_manager import ConnectionManager

ws = ws_router_factory(postfix="control")
manager = ConnectionManager()


@ws.websocket("/command")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            command = await websocket.receive_json()
            await manager.broadcast(command)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
