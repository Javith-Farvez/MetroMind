from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.schemas.approval import ApprovalCreate, ApprovalUpdate, ApprovalResponse
from app.services.approval_service import approval_service
from app.models.approval import Approval
from app.models.audit_log import AuditLog
import datetime

router = APIRouter(prefix="/approvals", tags=["Document & Decision Approvals"])

@router.get("/", response_model=List[ApprovalResponse])
def list_approvals(db: Session = Depends(get_db)):
    return approval_service.list_approvals(db)

@router.post("/", response_model=ApprovalResponse)
def create_approval(req: ApprovalCreate, db: Session = Depends(get_db)):
    return approval_service.create_approval(db, req, requester_id=1)

@router.put("/{approval_id}", response_model=ApprovalResponse)
def update_approval(approval_id: int, req: ApprovalUpdate, db: Session = Depends(get_db)):
    return approval_service.update_approval(db, approval_id, req)

@router.post("/{approval_id}/approve")
def approve_request(approval_id: int, comments: Optional[str] = None, user_id: int = 1, db: Session = Depends(get_db)):
    appr = db.query(Approval).filter(Approval.id == approval_id).first()
    if not appr:
        raise HTTPException(status_code=404, detail="Approval request not found")
    appr.status = "APPROVED"
    appr.approved_at = datetime.datetime.utcnow()
    appr.approver_id = user_id
    if comments: appr.comments = comments

    audit = AuditLog(user_id=user_id, action="APPROVAL_APPROVED", entity_type="Approval", entity_id=str(approval_id))
    db.add(audit)
    db.commit()
    return {"message": "Approval decision executed: APPROVED", "approval_id": approval_id}

@router.post("/{approval_id}/reject")
def reject_request(approval_id: int, comments: Optional[str] = None, user_id: int = 1, db: Session = Depends(get_db)):
    appr = db.query(Approval).filter(Approval.id == approval_id).first()
    if not appr:
        raise HTTPException(status_code=404, detail="Approval request not found")
    appr.status = "REJECTED"
    appr.approver_id = user_id
    if comments: appr.comments = comments

    audit = AuditLog(user_id=user_id, action="APPROVAL_REJECTED", entity_type="Approval", entity_id=str(approval_id))
    db.add(audit)
    db.commit()
    return {"message": "Approval decision executed: REJECTED", "approval_id": approval_id}

@router.post("/{approval_id}/return")
def return_request(approval_id: int, comments: Optional[str] = None, user_id: int = 1, db: Session = Depends(get_db)):
    appr = db.query(Approval).filter(Approval.id == approval_id).first()
    if not appr:
        raise HTTPException(status_code=404, detail="Approval request not found")
    appr.status = "RETURNED"
    if comments: appr.comments = comments
    db.commit()
    return {"message": "Approval request returned for modifications", "approval_id": approval_id}
