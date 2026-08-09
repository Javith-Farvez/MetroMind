from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

class DataSourceResponse(BaseModel):
    id: int
    name: str
    base_url: str
    source_type: str
    enabled: bool
    last_sync: Optional[datetime] = None
    status: str
    documents_found: int = 0
    documents_added: int = 0
    documents_duplicate: int = 0
    documents_failed: int = 0

    model_config = ConfigDict(from_attributes=True)

class IngestionRunResponse(BaseModel):
    id: int
    source_id: int
    status: str
    started_at: datetime
    completed_at: Optional[datetime] = None
    documents_found: int
    documents_added: int
    errors_count: int

    model_config = ConfigDict(from_attributes=True)

class IngestionErrorResponse(BaseModel):
    id: int
    run_id: int
    source_url: str
    error_message: str
    occurred_at: datetime

    model_config = ConfigDict(from_attributes=True)
