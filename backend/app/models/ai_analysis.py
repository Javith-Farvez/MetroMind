import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class AIAnalysis(Base):
    __tablename__ = "ai_analysis"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    document_id = Column(String(100), ForeignKey("documents.id", ondelete="CASCADE"), nullable=False, index=True)
    summary = Column(Text, nullable=True)
    key_findings = Column(JSON, nullable=True)
    important_dates = Column(JSON, nullable=True)
    risks = Column(JSON, nullable=True)
    risk_level = Column(String(50), default="Low", index=True)
    risk_reason = Column(Text, nullable=True)
    source_page = Column(Integer, default=1)
    priority = Column(String(50), default="Medium", index=True)
    priority_reason = Column(Text, nullable=True)
    recommended_department = Column(String(100), nullable=True)
    recommended_action = Column(Text, nullable=True)
    deadline_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    document = relationship("Document", backref="ai_analyses")
