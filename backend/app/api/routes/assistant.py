from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.assistant import AssistantQueryRequest, AssistantQueryResponse
from app.ai.assistant_service import assistant_service

router = APIRouter(prefix="/assistant", tags=["MetroFlow Intelligence Assistant"])

@router.post("/query", response_model=AssistantQueryResponse)
def query_assistant(req: AssistantQueryRequest, db: Session = Depends(get_db)):
    return assistant_service.answer_query(db, req)
