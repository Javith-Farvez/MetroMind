from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
import datetime

from app.core.database import get_db
from app.models.document import Document
from app.models.translation import DocumentTranslation
from app.models.audit_log import AuditLog
from app.ai.language_service import language_service

router = APIRouter(prefix="/documents", tags=["Document Multilingual Translation"])

class TranslationRequest(BaseModel):
    target_language: str

class TranslationResponse(BaseModel):
    id: int
    document_id: str
    target_language: str
    original_text: str
    translated_text: str
    created_at: str

@router.post("/{document_id}/translate", response_model=TranslationResponse)
def translate_document(
    document_id: str,
    req: TranslationRequest,
    db: Session = Depends(get_db)
):
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    target_lang = req.target_language.strip().title()

    # Check if translation already exists in PostgreSQL DB
    existing = db.query(DocumentTranslation).filter(
        DocumentTranslation.document_id == document_id,
        DocumentTranslation.target_language == target_lang
    ).first()

    orig_text = doc.description or f"Official document content for {doc.title} ({doc.id})."

    if existing:
        return TranslationResponse(
            id=existing.id,
            document_id=existing.document_id,
            target_language=existing.target_language,
            original_text=orig_text,
            translated_text=existing.translated_text,
            created_at=existing.created_at.strftime("%Y-%m-%d %H:%M:%S")
        )

    # Perform meaning-preserving translation preserving technical terms, dates, and numbers
    translated_content = language_service.translate_document(orig_text, target_lang)

    new_trans = DocumentTranslation(
        document_id=document_id,
        target_language=target_lang,
        translated_text=translated_content
    )
    db.add(new_trans)

    # Record Audit Event
    audit = AuditLog(
        user_id=1,
        action="TRANSLATION_CREATED",
        entity_type="DocumentTranslation",
        entity_id=document_id,
        log_metadata={"target_language": target_lang, "document_id": document_id}
    )
    db.add(audit)
    db.commit()
    db.refresh(new_trans)

    return TranslationResponse(
        id=new_trans.id,
        document_id=new_trans.document_id,
        target_language=new_trans.target_language,
        original_text=orig_text,
        translated_text=new_trans.translated_text,
        created_at=new_trans.created_at.strftime("%Y-%m-%d %H:%M:%S")
    )

@router.get("/{document_id}/translations", response_model=List[TranslationResponse])
def get_document_translations(document_id: str, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    orig_text = doc.description or ""
    records = db.query(DocumentTranslation).filter(DocumentTranslation.document_id == document_id).all()
    return [
        TranslationResponse(
            id=r.id,
            document_id=r.document_id,
            target_language=r.target_language,
            original_text=orig_text,
            translated_text=r.translated_text,
            created_at=r.created_at.strftime("%Y-%m-%d %H:%M:%S")
        )
        for r in records
    ]
