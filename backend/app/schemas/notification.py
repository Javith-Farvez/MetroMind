from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NotificationCreate(BaseModel):
    user_id: int
    title: str
    message: str
    type: str = "INFO"
    priority: str = "Medium"
    related_document_id: Optional[str] = None

class NotificationResponse(BaseModel):
    id: int
    user_id: int
    title: str
    message: str
    type: str
    priority: str
    is_read: bool
    related_document_id: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
