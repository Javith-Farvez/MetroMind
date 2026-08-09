from pydantic import BaseModel, ConfigDict
from typing import List, Dict, Any, Optional
from datetime import datetime

class ProcessingStatusResponse(BaseModel):
    document_id: str
    status: str  # UPLOADING, EXTRACTING, OCR, CLASSIFYING, SUMMARIZING, COMPLETED, FAILED
    stage: str
    progress: int  # 0 to 100
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    error_message: Optional[str] = None

class DocumentResponse(BaseModel):
    id: str
    title: str
    category: str = "General"
    department: str = "General"
    source: str = "Internal Registry"
    language: str = "English"
    confidence: float = 99.0
    status: str = "Ingested & Indexed"
    urgency: str = "Medium"
    timestamp: str = "Just Now"
    file_size: str = "2.4 MB"
    page_count: int = 4
    ocr_text: str = ""
    bounding_boxes: List[Dict[str, Any]] = []
    extracted_entities: Dict[str, Any] = {}
    suggested_actions: List[Dict[str, Any]] = []

    model_config = ConfigDict(from_attributes=True)

class DocumentDetailsResponse(BaseModel):
    document: DocumentResponse
    summary: Optional[Dict[str, Any]] = None
    entities: List[Dict[str, Any]] = []
    actions: List[Dict[str, Any]] = []
    risks: Optional[Dict[str, Any]] = None
    compliance: Optional[Dict[str, Any]] = None
    processing_status: ProcessingStatusResponse

class RAGQueryRequest(BaseModel):
    query: str
    department_filter: Optional[str] = None

class RAGQueryResponse(BaseModel):
    query: str
    answer: str
    citations: List[str] = []
    confidence: float = 99.0
    knowledge_nodes_matched: List[str] = []
