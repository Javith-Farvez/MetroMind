from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    assigned_to: Optional[int] = None
    department_id: Optional[int] = None
    document_id: Optional[str] = None
    priority: str = "Medium"
    due_date: Optional[datetime] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    assigned_to: Optional[int] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    due_date: Optional[datetime] = None

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    created_by: Optional[int] = None
    assigned_to: Optional[int] = None
    department_id: Optional[int] = None
    document_id: Optional[str] = None
    priority: str = "Medium"
    status: str = "TODO"
    due_date: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    assignee_name: Optional[str] = None
    department_name: Optional[str] = None

    class Config:
        from_attributes = True
