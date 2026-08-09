from pydantic import BaseModel
from typing import Dict, List, Any

class AnalyticsOverviewResponse(BaseModel):
    total_documents: int
    processed_documents: int
    pending_approvals: int
    overdue_tasks: int
    compliance_rate: float
    high_risk_alerts: int
    department_document_counts: Dict[str, int]
    monthly_volumes: List[Dict[str, Any]]
