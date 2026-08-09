from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.schemas.compliance import ComplianceCreate, ComplianceUpdate, ComplianceResponse
from app.services.compliance_service import compliance_service
from app.workflow.workflow_service import workflow_service
from app.models.compliance import ComplianceItem
from app.utils.storage import storage_service

router = APIRouter(prefix="/compliance", tags=["Compliance & Audit Hub"])

@router.get("/", response_model=List[ComplianceResponse])
def list_compliance(db: Session = Depends(get_db)):
    return compliance_service.list_compliance_items(db)

@router.post("/", response_model=ComplianceResponse)
def create_compliance(req: ComplianceCreate, db: Session = Depends(get_db)):
    return compliance_service.create_compliance_item(db, req)

@router.put("/{item_id}", response_model=ComplianceResponse)
def update_compliance(item_id: int, req: ComplianceUpdate, db: Session = Depends(get_db)):
    return compliance_service.update_compliance_item(db, item_id, req)

@router.post("/{item_id}/evidence")
async def upload_evidence(
    item_id: int,
    file: UploadFile = File(...),
    notes: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    content = await file.read()
    filename = file.filename or "evidence.pdf"
    file_path = storage_service.save_file(f"COMPLIANCE-{item_id}", filename, content)
    ev = workflow_service.upload_compliance_evidence(db, item_id, filename, file_path, user_id=1, notes=notes)
    return {"message": "Evidence uploaded successfully", "evidence_id": ev.id, "file_name": filename}

@router.post("/{item_id}/complete")
def complete_compliance(item_id: int, db: Session = Depends(get_db)):
    comp = db.query(ComplianceItem).filter(ComplianceItem.id == item_id).first()
    if not comp:
        raise HTTPException(status_code=404, detail="Compliance item not found")
    comp.status = "COMPLETED"
    db.commit()
    return {"message": "Compliance item completed successfully", "item_id": item_id}
