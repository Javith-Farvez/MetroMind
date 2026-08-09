import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from app.core.database import Base

class WorkOrder(Base):
    __tablename__ = "work_orders"

    id = Column(Integer, primary_key=True, index=True)
    work_order_number = Column(String(50), unique=True, index=True, nullable=False)
    source_recommendation_id = Column(Integer, nullable=True)
    source_document_id = Column(String(100), ForeignKey("documents.id"), nullable=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    department = Column(String(100), default="Operations & Maintenance")
    location = Column(String(100), default="Muttom Depot Bay-3")
    priority = Column(String(50), default="High")
    created_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    status = Column(String(50), default="CREATED")
    external_dispatched = Column(Boolean, default=False)
    external_system_note = Column(String(255), default="Work order created in MetroFlow.")
