from typing import Dict, Any

class WorkflowStateEngine:
    ALLOWED_STATES = [
        "DRAFT", "PENDING_CONFIRMATION", "ACTIVE", "IN_PROGRESS",
        "WAITING_APPROVAL", "COMPLETED", "REJECTED", "CANCELLED",
        "OVERDUE", "ESCALATED"
    ]

    TRANSITIONS = {
        "DRAFT": ["PENDING_CONFIRMATION", "ACTIVE", "CANCELLED"],
        "PENDING_CONFIRMATION": ["ACTIVE", "REJECTED", "CANCELLED"],
        "ACTIVE": ["IN_PROGRESS", "WAITING_APPROVAL", "CANCELLED"],
        "IN_PROGRESS": ["WAITING_APPROVAL", "COMPLETED", "OVERDUE", "ESCALATED", "CANCELLED"],
        "WAITING_APPROVAL": ["COMPLETED", "REJECTED", "IN_PROGRESS"],
        "OVERDUE": ["IN_PROGRESS", "ESCALATED", "COMPLETED"],
        "ESCALATED": ["IN_PROGRESS", "COMPLETED", "CANCELLED"]
    }

    def validate_transition(self, current_state: str, target_state: str) -> bool:
        allowed = self.TRANSITIONS.get(current_state, [])
        return target_state in allowed

workflow_state_engine = WorkflowStateEngine()
