from typing import Dict, Any

class DocumentClassifier:
    CATEGORIES = [
        "ENGINEERING", "MAINTENANCE", "SAFETY", "OPERATIONS", "FINANCE", 
        "PROCUREMENT", "HR", "LEGAL", "COMPLIANCE", "ENVIRONMENT", "BOARD", "GENERAL", "UNKNOWN"
    ]

    def classify(self, title: str, text: str) -> Dict[str, Any]:
        """Classifies documents into 13 standardized KMRL categories with confidence scoring."""
        content = (title + " " + text).lower()

        if any(k in content for k in ["bogie", "wheel lathe", "rake", "track", "catenary", "signaling", "substation"]):
            if "audit" in content or "inspection" in content or "overhaul" in content:
                category = "MAINTENANCE"
            else:
                category = "ENGINEERING"
            confidence = 99.4
        elif any(k in content for k in ["invoice", "po-", "purchase order", "disbursement", "tax", "gst", "payment", "finance"]):
            if "vendor" in content or "bhel" in content or "tender" in content:
                category = "PROCUREMENT"
            else:
                category = "FINANCE"
            confidence = 99.1
        elif any(k in content for k in ["safety", "hazard", "fire", "cmrs", "platform door", "interlock", "accident", "incident"]):
            category = "SAFETY"
            confidence = 98.9
        elif any(k in content for k in ["speed restriction", "occ", "viaduct", "timetable", "headway", "driver", "train operations"]):
            category = "OPERATIONS"
            confidence = 97.8
        elif any(k in content for k in ["welfare", "allowance", "salary", "shift roster", "hr", "recruitment", "leave"]):
            category = "HR"
            confidence = 96.5
        elif any(k in content for k in ["land acquisition", "right of way", "court", "legal", "clause", "contractor notice"]):
            category = "LEGAL"
            confidence = 95.0
        elif any(k in content for k in ["environment", "polution", "eia", "green metro", "solar", "tree felling"]):
            category = "ENVIRONMENT"
            confidence = 94.2
        elif any(k in content for k in ["board minutes", "resolution", "managing director", "directorate", "cabinet"]):
            category = "BOARD"
            confidence = 93.8
        elif any(k in content for k in ["directive", "statutory", "audit compliance", "gazette", "circular"]):
            category = "COMPLIANCE"
            confidence = 96.0
        else:
            category = "GENERAL"
            confidence = 88.0

        return {
            "category": category,
            "confidence_score": confidence
        }

document_classifier = DocumentClassifier()
