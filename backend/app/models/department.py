import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    code = Column(String(20), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    head_user_id = Column(Integer, ForeignKey("users.id", use_alter=True, name="fk_dept_head_user"), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    users = relationship("User", back_populates="department", foreign_keys="[User.department_id]")
    documents = relationship("Document", back_populates="department")
    tasks = relationship("Task", back_populates="department")
