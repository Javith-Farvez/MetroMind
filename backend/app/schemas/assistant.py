from pydantic import BaseModel, ConfigDict
from typing import List, Dict, Any, Optional

class AssistantQueryRequest(BaseModel):
    query: str
    language: Optional[str] = "English"  # English, Malayalam, Hindi
    history: Optional[List[Dict[str, str]]] = None

class SourceCitation(BaseModel):
    document_id: str
    document_title: str
    page_number: int = 1
    snippet: str
    confidence: float = 95.0

class AssistantQueryResponse(BaseModel):
    query: str
    answer: str
    language: str
    confidence: float = 96.5
    citations: List[SourceCitation]
    suggested_followups: List[str]

    model_config = ConfigDict(from_attributes=True)
