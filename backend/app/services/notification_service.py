from typing import List
from sqlalchemy.orm import Session
from app.models.notification import Notification
from app.schemas.notification import NotificationCreate, NotificationResponse

class NotificationService:
    def list_user_notifications(self, db: Session, user_id: int) -> List[NotificationResponse]:
        notifs = db.query(Notification).filter(Notification.user_id == user_id).order_by(Notification.created_at.desc()).all()
        return [NotificationResponse.model_validate(n) for n in notifs]

    def create_notification(self, db: Session, req: NotificationCreate) -> NotificationResponse:
        n = Notification(
            user_id=req.user_id,
            title=req.title,
            message=req.message,
            type=req.type,
            priority=req.priority,
            related_document_id=req.related_document_id
        )
        db.add(n)
        db.commit()
        db.refresh(n)
        return NotificationResponse.model_validate(n)

    def mark_read(self, db: Session, notification_id: int) -> NotificationResponse:
        n = db.query(Notification).filter(Notification.id == notification_id).first()
        if n:
            n.is_read = True
            db.commit()
            db.refresh(n)
        return NotificationResponse.model_validate(n)

notification_service = NotificationService()
