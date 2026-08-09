from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class DocumentMetadata(Base):
    __tablename__ = "document_metadata"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(String(100), ForeignKey("documents.id"), nullable=False, unique=True, index=True)
    reference_number = Column(String(100), nullable=True)
    document_date = Column(DateTime, nullable=True)
    department = Column(String(150), nullable=True)
    station = Column(String(150), nullable=True)
    depot = Column(String(150), nullable=True)
    location = Column(String(150), nullable=True)
    vendor = Column(String(200), nullable=True)
    contract_number = Column(String(150), nullable=True)
    amount = Column(String(100), nullable=True)
    deadline = Column(String(100), nullable=True)
    author = Column(String(150), nullable=True)
    subject = Column(String(255), nullable=True)
    expiry_date = Column(DateTime, nullable=True)
    tags = Column(JSON, nullable=True)
    other_metadata = Column(JSON, nullable=True)
    metadata_json = Column(JSON, nullable=True)

    document = relationship("Document", back_populates="doc_metadata")
