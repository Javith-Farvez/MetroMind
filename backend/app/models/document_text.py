import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class DocumentText(Base):
    __tablename__ = "document_text"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    document_id = Column(String(100), ForeignKey("documents.id", ondelete="CASCADE"), nullable=False, index=True)
    page_number = Column(Integer, default=1, index=True)
    extracted_text = Column(Text, nullable=False)
    ocr_text = Column(Text, nullable=True)
    original_page_image = Column(Text, nullable=True)
    ocr_status = Column(String(50), default="COMPLETED")
    extraction_method = Column(String(50), default="TEXT_OR_OCR")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    document = relationship("Document", backref="document_texts")
