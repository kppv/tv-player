from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.core.routing import init_routing

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_routing(app)
