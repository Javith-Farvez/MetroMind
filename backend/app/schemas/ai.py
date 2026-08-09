from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class ProcessDocumentRequest(BaseModel):
    document_id: str
    run_ocr: bool = True
    detect_language: bool = True
    generate_summary: bool = True

class ProcessDocumentResponse(BaseModel):
    document_id: str
    status: str
    ocr_extracted_length: int
    detected_language: str
    summary: str
    extracted_entities: Dict[str, Any]
    risk_level: str
    suggested_department: str
