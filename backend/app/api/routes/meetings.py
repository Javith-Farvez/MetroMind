from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.meeting import MeetingProcessRequest, MeetingProcessResponse
from app.models.meeting import MeetingRecord
from app.ai.meeting_service import meeting_intelligence_service

router = APIRouter(prefix="/meetings", tags=["Meeting Intelligence Engine"])

@router.post("/process", response_model=MeetingProcessResponse)
def process_meeting_minutes(req: MeetingProcessRequest, db: Session = Depends(get_db)):
    return meeting_intelligence_service.process_minutes(db, req)

@router.get("/{meeting_id}", response_model=MeetingProcessResponse)
def get_meeting(meeting_id: int, db: Session = Depends(get_db)):
    m = db.query(MeetingRecord).filter(MeetingRecord.id == meeting_id).first()
    if not m:
        raise HTTPException(status_code=404, detail="Meeting record not found")
    return m
