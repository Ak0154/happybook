from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from db import init_indexes
from backend.routes.auth_routes import router as auth_router
from backend.routes.chat_routes import router as chat_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Runs on startup — replaces deprecated @app.on_event("startup")"""
    await init_indexes()
    print("✅ MongoDB indexes ready")
    yield
    print("🔴 Server shutting down")


app = FastAPI(
    title="HappyBook API",
    description="Student assistant backend — auth + Gemini chat",
    version="1.0.0",
    lifespan=lifespan
)


# --- CORS (allow React frontend) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server
        "http://localhost:3000",   # CRA dev server
        # "https://happybook.vercel.app"  # add your deployed frontend URL here
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Routers ---
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(chat_router, prefix="/chat", tags=["Chat"])


# --- Health check ---
@app.get("/", tags=["Health"])
async def root():
    return {"status": "ok", "app": "HappyBook API"}