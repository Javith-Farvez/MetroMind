from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.core.database import Base

class DocumentRelationship(Base):
    __tablename__ = "document_relationships"

    id = Column(Integer, primary_key=True, index=True)
    source_document_id = Column(String(100), ForeignKey("documents.id"), nullable=False, index=True)
    target_document_id = Column(String(100), ForeignKey("documents.id"), nullable=False, index=True)
    relationship_type = Column(String(100), nullable=False)  # e.g., "REFERENCES", "SUPERSEDES", "ATTACHMENT"
    confidence = Column(Float, default=95.0)
