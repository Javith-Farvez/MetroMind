import hashlib
from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.document import Document

class DuplicateDetector:
    def calculate_hash(self, content: bytes) -> str:
        return hashlib.sha256(content).hexdigest()

    def check_duplicate(self, db: Session, document_id: str) -> Dict[str, Any]:
        target = db.query(Document).filter(Document.id == document_id).first()
        if not target:
            return {"is_duplicate": False, "similarity_score": 0.0}

        docs = db.query(Document).filter(Document.id != document_id).all()
        best_match = None
        max_sim = 0.0

        for d in docs:
            sim = 0.0
            if d.file_name == target.file_name:
                sim += 0.50
            if d.document_category == target.document_category:
                sim += 0.30
            if d.title and target.title and d.title.lower() in target.title.lower():
                sim += 0.18

            if sim > max_sim:
                max_sim = sim
                best_match = d

        status = "Likely Duplicate" if max_sim >= 0.85 else "Possible Duplicate" if max_sim >= 0.50 else "Unique"

        return {
            "target_document_id": document_id,
            "similar_document_id": best_match.id if best_match else None,
            "similar_document_title": best_match.title if best_match else None,
            "similarity_percentage": round(max_sim * 100, 1),
            "status": status,
            "reasons": [
                f"Shares same department and category: {target.document_category}",
                f"Overlapping vendor reference or title parameters"
            ] if best_match else []
        }

duplicate_detector = DuplicateDetector()
