from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.ai import ProcessDocumentRequest, ProcessDocumentResponse
from app.repositories.document_repository import document_repository
from app.ai.document_processor import document_processor

router = APIRouter(prefix="/ai", tags=["AI Engine Services"])

@router.post("/process/{document_id}", response_model=ProcessDocumentResponse)
def process_document(document_id: str, req: ProcessDocumentRequest, db: Session = Depends(get_db)):
    doc = document_repository.get_by_id(db, document_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    pipeline_res = document_processor.run_pipeline(
        title=doc.title,
        filename=doc.file_name,
        file_path=doc.storage_path or "./uploaded.pdf",
        user_category=doc.document_category,
        user_department=doc.department.name if doc.department else "Operations"
    )

    return ProcessDocumentResponse(
        document_id=doc.id,
        status="COMPLETED",
        ocr_extracted_length=len(pipeline_res["ocr_text"]),
        detected_language=pipeline_res["language"],
        summary=pipeline_res["summary"],
        extracted_entities=pipeline_res["extracted_entities"],
        risk_level=pipeline_res["risk_level"],
        suggested_department=pipeline_res["department"]
    )
