from pydantic import BaseModel, ConfigDict
from typing import List, Dict, Any, Optional
from datetime import datetime

class SearchRequest(BaseModel):
    query: str
    filters: Optional[Dict[str, Any]] = None
    page: int = 1
    page_size: int = 20

class SearchResultItem(BaseModel):
    document_id: str
    title: str
    category: str
    department: str
    relevance_score: float
    matched_snippet: str
    page_number: int = 1
    priority: str = "Medium"
    language: str = "English"
    date: str = "2026-08-08"
    entities: List[str] = []
    risk_level: str = "Low"
    source_reference: Dict[str, Any] = {}

class SearchResponse(BaseModel):
    query: str
    intent: str
    results: List[SearchResultItem] = []
    entities: List[Dict[str, Any]] = []
    related_documents: List[Dict[str, Any]] = []
    departments: List[str] = []
    suggested_queries: List[str] = []
    total: int = 0

class SavedSearchCreate(BaseModel):
    name: str
    query: str
    filters: Optional[Dict[str, Any]] = None

class SavedSearchResponse(BaseModel):
    id: int
    user_id: int
    name: str
    query: str
    filters: Optional[Dict[str, Any]] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class SearchHistoryResponse(BaseModel):
    id: int
    query: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
