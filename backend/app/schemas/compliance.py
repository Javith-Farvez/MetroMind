from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ComplianceCreate(BaseModel):
    title: str
    description: Optional[str] = None
    source_document_id: Optional[str] = None
    department_id: Optional[int] = None
    deadline: Optional[datetime] = None
    status: str = "Compliant"
    risk_level: str = "Low"
    assigned_to: Optional[int] = None

class ComplianceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[datetime] = None
    status: Optional[str] = None
    risk_level: Optional[str] = None
    assigned_to: Optional[int] = None

class ComplianceResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    source_document_id: Optional[str] = None
    department_id: Optional[int] = None
    deadline: Optional[datetime] = None
    status: str
    risk_level: str
    assigned_to: Optional[int] = None
    created_at: datetime
    updated_at: datetime
    department_name: Optional[str] = None

    class Config:
        from_attributes = True
