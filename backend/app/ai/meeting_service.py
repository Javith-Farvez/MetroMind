import datetime
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.meeting import MeetingRecord, MeetingAction
from app.schemas.meeting import MeetingProcessRequest

class MeetingIntelligenceService:
    def process_minutes(self, db: Session, req: MeetingProcessRequest, user_id: int = 1) -> MeetingRecord:
        summary = f"KMRL Executive & Operations Meeting Minutes Summary: Extracted decisions from '{req.title}'."

        record = MeetingRecord(
            title=req.title,
            meeting_date=datetime.datetime.utcnow(),
            department_id=req.department_id,
            uploaded_by=user_id,
            summary=summary
        )
        db.add(record)
        db.commit()
        db.refresh(record)

        # Extract Action Items with Human Confirmation status
        lines = [l.strip() for l in req.minutes_text.split('\n') if l.strip()]
        for line in lines:
            if any(kw in line.lower() for kw in ["inspect", "replace", "submit", "audit", "approve", "verify", "action"]):
                action = MeetingAction(
                    meeting_id=record.id,
                    action_item=line[:250],
                    responsible_role="Operations Manager" if "maintain" in line.lower() else "Safety Lead",
                    deadline="Within 7 days",
                    status="PENDING_CONFIRMATION"
                )
                db.add(action)

        db.commit()
        db.refresh(record)
        return record

meeting_intelligence_service = MeetingIntelligenceService()
