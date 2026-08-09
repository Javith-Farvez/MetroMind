from typing import List
from sqlalchemy.orm import Session
from app.models.compliance import ComplianceItem
from app.schemas.compliance import ComplianceCreate, ComplianceUpdate, ComplianceResponse

class ComplianceService:
    def list_compliance_items(self, db: Session) -> List[ComplianceResponse]:
        items = db.query(ComplianceItem).order_by(ComplianceItem.created_at.desc()).all()
        res = []
        for c in items:
            dept_name = "Operations & Safety"
            res.append(ComplianceResponse(
                id=c.id,
                title=c.title,
                description=c.description,
                source_document_id=c.source_document_id,
                department_id=c.department_id,
                deadline=c.deadline,
                status=c.status,
                risk_level=c.risk_level,
                assigned_to=c.assigned_to,
                created_at=c.created_at,
                updated_at=c.updated_at,
                department_name=dept_name
            ))
        return res

    def create_compliance_item(self, db: Session, req: ComplianceCreate) -> ComplianceResponse:
        c = ComplianceItem(
            title=req.title,
            description=req.description,
            source_document_id=req.source_document_id,
            department_id=req.department_id,
            deadline=req.deadline,
            status=req.status,
            risk_level=req.risk_level,
            assigned_to=req.assigned_to
        )
        db.add(c)
        db.commit()
        db.refresh(c)
        return ComplianceResponse.model_validate(c)

    def update_compliance_item(self, db: Session, item_id: int, req: ComplianceUpdate) -> ComplianceResponse:
        c = db.query(ComplianceItem).filter(ComplianceItem.id == item_id).first()
        if not c:
            raise Exception("Compliance item not found")

        if req.title is not None: c.title = req.title
        if req.description is not None: c.description = req.description
        if req.deadline is not None: c.deadline = req.deadline
        if req.status is not None: c.status = req.status
        if req.risk_level is not None: c.risk_level = req.risk_level

        db.commit()
        db.refresh(c)
        return ComplianceResponse.model_validate(c)

compliance_service = ComplianceService()
