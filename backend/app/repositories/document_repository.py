from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.document import Document

class DocumentRepository:
    def get_by_id(self, db: Session, doc_id: str) -> Optional[Document]:
        return db.query(Document).filter(Document.id == doc_id).first()

    def list_all(self, db: Session, department_id: Optional[int] = None, skip: int = 0, limit: int = 100) -> List[Document]:
        query = db.query(Document)
        if department_id:
            query = query.filter(Document.department_id == department_id)
        return query.order_by(Document.created_at.desc()).offset(skip).limit(limit).all()

    def create(self, db: Session, doc: Document) -> Document:
        db.add(doc)
        db.commit()
        db.refresh(doc)
        return doc

    def update(self, db: Session, doc: Document) -> Document:
        db.commit()
        db.refresh(doc)
        return doc

    def delete(self, db: Session, doc: Document):
        db.delete(doc)
        db.commit()

document_repository = DocumentRepository()
