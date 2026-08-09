from typing import Dict, Any, List

class WorkflowRuleEngine:
    """Configurable enterprise workflow routing rules engine."""
    
    CATEGORY_ROUTING_MAP = {
        "SAFETY": "Safety & Quality Assurance",
        "MAINTENANCE": "Operations & Maintenance",
        "ENGINEERING": "Engineering & Infrastructure",
        "FINANCE": "Finance & Procurement",
        "PROCUREMENT": "Finance & Procurement",
        "HR": "Executive Directorate",
        "LEGAL": "Executive Directorate",
        "COMPLIANCE": "Safety & Quality Assurance",
        "ENVIRONMENT": "Engineering & Infrastructure",
        "BOARD": "Executive Directorate"
    }

    def evaluate_rules(self, category: str, text: str, priority: str) -> Dict[str, Any]:
        target_dept = self.CATEGORY_ROUTING_MAP.get(category, "Operations & Maintenance")
        requires_approval = priority in ["CRITICAL", "HIGH"] or category in ["FINANCE", "PROCUREMENT", "LEGAL"]
        requires_compliance = category in ["SAFETY", "COMPLIANCE", "ENVIRONMENT"] or "statutory" in text.lower() or "cmrs" in text.lower()
        
        escalation_tier = 1
        if priority == "CRITICAL":
            escalation_tier = 4
        elif priority == "HIGH":
            escalation_tier = 3

        return {
            "target_department": target_dept,
            "requires_approval": requires_approval,
            "requires_compliance": requires_compliance,
            "escalation_tier": escalation_tier
        }

workflow_rule_engine = WorkflowRuleEngine()
