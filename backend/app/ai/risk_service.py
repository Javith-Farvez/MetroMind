from typing import Dict, Any

class RiskService:
    def evaluate_risk(self, title: str, text: str, priority: str) -> Dict[str, Any]:
        """Evaluate document risk level and compliance impact score."""
        t_lower = (title + " " + text).lower()
        if "critical" in t_lower or "urgent" in t_lower or priority.lower() == "urgent" or "hazard" in t_lower:
            risk = "High"
            impact = 88.5
        elif "audit" in t_lower or "warning" in t_lower or priority.lower() == "high":
            risk = "Medium"
            impact = 54.0
        else:
            risk = "Low"
            impact = 12.0

        return {
            "risk_level": risk,
            "risk_score": impact
        }

risk_service = RiskService()
