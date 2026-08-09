from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

class MeetingProcessRequest(BaseModel):
    title: str
    minutes_text: str
    department_id: Optional[int] = 1

class MeetingActionResponse(BaseModel):
    id: int
    action_item: str
    responsible_role: str
    deadline: Optional[str] = None
    status: str = "PENDING_CONFIRMATION"

    model_config = ConfigDict(from_attributes=True)

class MeetingProcessResponse(BaseModel):
    id: int
    title: str
    summary: str
    meeting_date: datetime
    actions: List[MeetingActionResponse]

    model_config = ConfigDict(from_attributes=True)
