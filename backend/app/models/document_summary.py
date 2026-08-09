import datetime
from sqlalchemy import Column, Integer, String, Text, Float, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class DocumentSummary(Base):
    __tablename__ = "document_summaries"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(String(100), ForeignKey("documents.id"), nullable=False, unique=True, index=True)
    summary = Column(Text, nullable=False)
    key_points = Column(JSON, nullable=True)
    important_entities = Column(JSON, nullable=True)
    action_items = Column(JSON, nullable=True)
    risk_level = Column(String(50), default="Low")
    confidence_score = Column(Float, default=99.0)
    generated_at = Column(DateTime, default=datetime.datetime.utcnow)

    document = relationship("Document", back_populates="summary")
