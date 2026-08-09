import datetime
from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(String(100), primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    file_name = Column(String(255), nullable=False)
    file_type = Column(String(50), nullable=False)
    file_size = Column(String(50), nullable=False)
    storage_path = Column(String(500), nullable=True)
    uploaded_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=True, index=True)
    status = Column(String(50), default="Ingested & Indexed", index=True)
    priority = Column(String(50), default="Medium", index=True)
    language = Column(String(50), default="English", index=True)
    document_category = Column(String(100), default="General", index=True)
    confidence = Column(Float, default=99.0)
    page_count = Column(Integer, default=1)
    source = Column(String(100), default="Direct Upload")
    source_type = Column(String(100), default="USER_UPLOADED", index=True)
    source_url = Column(String(500), nullable=True)
    source_title = Column(String(255), nullable=True)
    file_hash = Column(String(100), nullable=True, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    uploader = relationship("User", back_populates="uploaded_documents")
    department = relationship("Department", back_populates="documents")
    versions = relationship("DocumentVersion", back_populates="document", cascade="all, delete-orphan")
    doc_metadata = relationship("DocumentMetadata", back_populates="document", uselist=False, cascade="all, delete-orphan")
    summary = relationship("DocumentSummary", back_populates="document", uselist=False, cascade="all, delete-orphan")
    entities = relationship("DocumentEntity", back_populates="document", cascade="all, delete-orphan")
    tasks = relationship("Task", back_populates="document")
    approvals = relationship("Approval", back_populates="document")
    comments = relationship("Comment", back_populates="document", cascade="all, delete-orphan")
    compliance_items = relationship("ComplianceItem", back_populates="source_document")
