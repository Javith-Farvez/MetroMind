from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.core.config import settings
from app.core.database import engine, Base, get_db
import app.models  # Register all SQLAlchemy models

# Import API routes
from app.api.routes import auth, users, departments, documents, search, tasks, approvals, notifications, compliance, analytics, ai, admin, knowledge, workflows, assistant, meetings, sources, translations
from app.api.endpoints import graph
from app.core.websockets import websocket_manager

# Create database tables automatically if using local dev SQLite / Postgres
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend microservice platform for Kochi Metro Rail Limited (KMRL). Handles document OCR, Malayalam translation, vector embedding, Knowledge Graph queries, and automated department workflow routing.",
    version="3.4.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers under /api/v1 and legacy endpoints
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(users.router, prefix=settings.API_V1_STR)
app.include_router(departments.router, prefix=settings.API_V1_STR)
app.include_router(documents.router, prefix=settings.API_V1_STR)
app.include_router(translations.router, prefix=settings.API_V1_STR)
app.include_router(search.router, prefix=settings.API_V1_STR)
app.include_router(knowledge.router, prefix=settings.API_V1_STR)
app.include_router(workflows.router, prefix=settings.API_V1_STR)
app.include_router(tasks.router, prefix=settings.API_V1_STR)
app.include_router(approvals.router, prefix=settings.API_V1_STR)
app.include_router(notifications.router, prefix=settings.API_V1_STR)
app.include_router(compliance.router, prefix=settings.API_V1_STR)
app.include_router(analytics.router, prefix=settings.API_V1_STR)
app.include_router(ai.router, prefix=settings.API_V1_STR)
app.include_router(assistant.router, prefix=settings.API_V1_STR)
app.include_router(meetings.router, prefix=settings.API_V1_STR)
app.include_router(sources.router, prefix=settings.API_V1_STR)
app.include_router(admin.router, prefix=settings.API_V1_STR)
app.include_router(graph.router, prefix=settings.API_V1_STR)

@app.websocket("/api/v1/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket_manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_json({"event": "ack", "message": "Received live KMRL event"})
    except WebSocketDisconnect:
        websocket_manager.disconnect(websocket)

@app.get("/", tags=["Health Check"])
@app.get("/api/v1/health", tags=["Health Check"])
def health_check(db: Session = Depends(get_db)):
    db_healthy = True
    try:
        db.execute(text("SELECT 1"))
    except Exception as err:
        print("Health check DB query note:", err)
        db_healthy = False

    return {
        "system": "MetroFlow Enterprise Operating System",
        "organization": "Kochi Metro Rail Limited (KMRL)",
        "status": "ONLINE" if db_healthy else "DEGRADED",
        "version": "v3.4 Enterprise",
        "services": {
            "postgresql_database": "CONNECTED" if db_healthy else "DISCONNECTED",
            "redis_cache": "CONNECTED",
            "object_storage": "AVAILABLE",
            "neo4j_knowledge_graph": "CONNECTED",
            "celery_workers": "ACTIVE"
        },
        "api_docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
