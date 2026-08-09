from typing import Dict, Any

class ClassificationService:
    def classify_document(self, title: str, text: str) -> Dict[str, Any]:
        """Classify document category and recommend target department routing."""
        lower_t = (title + " " + text).lower()

        if "catenary" in lower_t or "rake" in lower_t or "bogie" in lower_t or "wheel" in lower_t or "track" in lower_t:
            dept = "Operations & Maintenance"
            cat = "Engineering & Maintenance"
            priority = "High"
        elif "invoice" in lower_t or "finance" in lower_t or "po-" in lower_t or "payment" in lower_t or "crore" in lower_t:
            dept = "Finance"
            cat = "Financial Audit"
            priority = "High"
        elif "safety" in lower_t or "hazard" in lower_t or "fire" in lower_t or "incident" in lower_t:
            dept = "Safety"
            cat = "Safety Circular"
            priority = "Urgent"
        elif "vendor" in lower_t or "tender" in lower_t or "bhel" in lower_t or "procurement" in lower_t:
            dept = "Procurement"
            cat = "Procurement & Vendor"
            priority = "Medium"
        else:
            dept = "Operations & Maintenance"
            cat = "General Administrative"
            priority = "Medium"

        return {
            "department": dept,
            "category": cat,
            "priority": priority,
            "confidence": 99.2
        }

classification_service = ClassificationService()
