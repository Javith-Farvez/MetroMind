from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.notification import NotificationCreate, NotificationResponse
from app.services.notification_service import notification_service

router = APIRouter(prefix="/notifications", tags=["Real-time Notifications"])

@router.get("/", response_model=List[NotificationResponse])
def list_notifications(user_id: int = 1, db: Session = Depends(get_db)):
    return notification_service.list_user_notifications(db, user_id)

@router.post("/", response_model=NotificationResponse)
def create_notification(req: NotificationCreate, db: Session = Depends(get_db)):
    return notification_service.create_notification(db, req)

@router.put("/{notification_id}/read", response_model=NotificationResponse)
def mark_read(notification_id: int, db: Session = Depends(get_db)):
    return notification_service.mark_read(db, notification_id)
