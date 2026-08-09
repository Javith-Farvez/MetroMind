import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class MeetingRecord(Base):
    __tablename__ = "meeting_records"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    meeting_date = Column(DateTime, default=datetime.datetime.utcnow)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)
    uploaded_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    actions = relationship("MeetingAction", back_populates="meeting", cascade="all, delete-orphan")

class MeetingAction(Base):
    __tablename__ = "meeting_actions"

    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(Integer, ForeignKey("meeting_records.id"), nullable=False, index=True)
    action_item = Column(Text, nullable=False)
    responsible_role = Column(String(100), default="Operations Manager")
    deadline = Column(String(100), nullable=True)
    status = Column(String(50), default="PENDING_CONFIRMATION")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    meeting = relationship("MeetingRecord", back_populates="actions")
