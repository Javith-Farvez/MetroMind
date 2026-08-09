from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ApprovalCreate(BaseModel):
    document_id: str
    approver_id: Optional[int] = None
    comments: Optional[str] = None

class ApprovalUpdate(BaseModel):
    status: str  # Approved, Rejected
    comments: Optional[str] = None

class ApprovalResponse(BaseModel):
    id: int
    document_id: str
    requested_by: Optional[int] = None
    approver_id: Optional[int] = None
    status: str
    comments: Optional[str] = None
    requested_at: datetime
    approved_at: Optional[datetime] = None
    document_title: Optional[str] = None
    requester_name: Optional[str] = None
    approver_name: Optional[str] = None

    class Config:
        from_attributes = True
