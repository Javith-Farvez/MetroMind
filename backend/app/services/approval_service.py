import datetime
from typing import List
from sqlalchemy.orm import Session
from app.models.approval import Approval
from app.models.document import Document
from app.schemas.approval import ApprovalCreate, ApprovalUpdate, ApprovalResponse

class ApprovalService:
    def list_approvals(self, db: Session) -> List[ApprovalResponse]:
        approvals = db.query(Approval).order_by(Approval.requested_at.desc()).all()
        res = []
        for a in approvals:
            doc_title = a.document.title if a.document else "KMRL Document"
            res.append(ApprovalResponse(
                id=a.id,
                document_id=a.document_id,
                requested_by=a.requested_by,
                approver_id=a.approver_id,
                status=a.status,
                comments=a.comments,
                requested_at=a.requested_at,
                approved_at=a.approved_at,
                document_title=doc_title,
                requester_name="Operation Team Lead",
                approver_name="Executive Director"
            ))
        return res

    def create_approval(self, db: Session, req: ApprovalCreate, requester_id: int) -> ApprovalResponse:
        approval = Approval(
            document_id=req.document_id,
            requested_by=requester_id,
            approver_id=req.approver_id,
            status="Under Review",
            comments=req.comments
        )
        db.add(approval)
        db.commit()
        db.refresh(approval)
        return ApprovalResponse.model_validate(approval)

    def update_approval(self, db: Session, approval_id: int, req: ApprovalUpdate) -> ApprovalResponse:
        approval = db.query(Approval).filter(Approval.id == approval_id).first()
        if not approval:
            raise Exception("Approval request not found")

        approval.status = req.status
        approval.comments = req.comments
        if req.status in ["Approved", "Rejected"]:
            approval.approved_at = datetime.datetime.utcnow()

        db.commit()
        db.refresh(approval)
        return ApprovalResponse.model_validate(approval)

approval_service = ApprovalService()
