import re
from typing import Dict, Any, List

class QueryIntentParser:
    INTENT_TYPES = [
        "DOCUMENT_SEARCH", "ENTITY_SEARCH", "DEPARTMENT_SEARCH", "VENDOR_SEARCH",
        "COMPLIANCE_SEARCH", "INCIDENT_SEARCH", "MAINTENANCE_SEARCH", "FINANCE_SEARCH",
        "SAFETY_SEARCH", "TASK_SEARCH", "APPROVAL_SEARCH", "RELATIONSHIP_SEARCH",
        "DEADLINE_SEARCH", "GENERAL_KNOWLEDGE"
    ]

    def parse_query(self, query: str) -> Dict[str, Any]:
        """Parses natural language search queries in English, Malayalam, or Bilingual formats."""
        q_lower = query.lower().strip()

        # Intent Detection Logic
        if any(k in q_lower for k in ["safety", "hazard", "fire", "cmrs", "സുരക്ഷ", "സെക്യൂരിറ്റി"]):
            intent = "SAFETY_SEARCH"
            category_filter = "SAFETY"
        elif any(k in q_lower for k in ["brake", "wheel", "bogie", "muttom", "maintenance", "repair", "overhaul"]):
            intent = "MAINTENANCE_SEARCH"
            category_filter = "MAINTENANCE"
        elif any(k in q_lower for k in ["invoice", "po-", "purchase order", "bhel", "amount", "finance", "lakh", "crore", "disbursement"]):
            intent = "FINANCE_SEARCH"
            category_filter = "FINANCE"
        elif any(k in q_lower for k in ["compliance", "directive", "deadline", "audit"]):
            intent = "COMPLIANCE_SEARCH"
            category_filter = "COMPLIANCE"
        elif any(k in q_lower for k in ["station", "aluva", "edapally", "kalamassery", "petta"]):
            intent = "STATION_SEARCH"
            category_filter = None
        elif any(k in q_lower for k in ["vendor", "alstom", "supplier"]):
            intent = "VENDOR_SEARCH"
            category_filter = None
        else:
            intent = "DOCUMENT_SEARCH"
            category_filter = None

        # Detect Station Entities
        extracted_stations = []
        for st in ["Aluva", "Muttom", "Kalamassery", "Edapally", "Petta", "Kakkanad"]:
            if st.lower() in q_lower:
                extracted_stations.append(st)

        # Detect Monetary Thresholds (e.g. "above 10 lakh")
        min_amount = None
        amt_match = re.search(r'(?:above|more than|>|>=)\s*(\d+(?:\.\d+)?)\s*(lakh|lakhs|crore|cr)?', q_lower)
        if amt_match:
            val = float(amt_match.group(1))
            unit = amt_match.group(2)
            if unit in ["crore", "cr"]:
                min_amount = val * 10000000
            elif unit in ["lakh", "lakhs"]:
                min_amount = val * 100000
            else:
                min_amount = val

        return {
            "query": query,
            "intent": intent,
            "category_filter": category_filter,
            "extracted_stations": extracted_stations,
            "min_amount": min_amount,
            "is_malayalam": any('\u0d00' <= char <= '\u0d7f' for char in query)
        }

query_intent_parser = QueryIntentParser()
