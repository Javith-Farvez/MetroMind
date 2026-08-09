from pydantic import BaseModel, ConfigDict
from typing import List, Dict, Any, Optional
from datetime import datetime

class WorkflowRecommendationResponse(BaseModel):
    id: int
    document_id: str
    suggested_action: str
    reason: str
    source_page: int = 1
    recommended_department: str
    recommended_owner: str
    deadline: Optional[str] = None
    priority: str = "Medium"
    confidence: float = 95.0
    status: str = "PENDING"
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class WorkflowResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    trigger_type: str = "DOCUMENT_INGESTED"
    status: str = "ACTIVE"
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class RecommendationAcceptRequest(BaseModel):
    assigned_user_id: Optional[int] = 1
    due_date: Optional[str] = None
    custom_notes: Optional[str] = None

class RecommendationRejectRequest(BaseModel):
    rejection_reason: Optional[str] = None

class RecommendationEditRequest(BaseModel):
    suggested_action: Optional[str] = None
    recommended_department: Optional[str] = None
    recommended_owner: Optional[str] = None
    priority: Optional[str] = None
    deadline: Optional[str] = None

class ComplianceEvidenceResponse(BaseModel):
    id: int
    compliance_item_id: int
    file_name: str
    file_path: str
    notes: Optional[str] = None
    uploaded_at: datetime

    model_config = ConfigDict(from_attributes=True)
