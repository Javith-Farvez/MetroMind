from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.approval import Approval

class ApprovalRepository:
    def get_by_id(self, db: Session, approval_id: int) -> Optional[Approval]:
        return db.query(Approval).filter(Approval.id == approval_id).first()

    def list_all(self, db: Session, status: Optional[str] = None) -> List[Approval]:
        query = db.query(Approval)
        if status:
            query = query.filter(Approval.status == status)
        return query.order_by(Approval.requested_at.desc()).all()

    def create(self, db: Session, approval: Approval) -> Approval:
        db.add(approval)
        db.commit()
        db.refresh(approval)
        return approval

    def update(self, db: Session, approval: Approval) -> Approval:
        db.commit()
        db.refresh(approval)
        return approval

approval_repository = ApprovalRepository()
