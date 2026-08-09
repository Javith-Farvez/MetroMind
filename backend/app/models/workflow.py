import datetime
from sqlalchemy import Column, Integer, String, Text, JSON, DateTime, ForeignKey, Boolean, Float
from app.core.database import Base

class Workflow(Base):
    __tablename__ = "workflows"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    trigger_type = Column(String(100), default="DOCUMENT_INGESTED")
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    status = Column(String(50), default="ACTIVE")  # DRAFT, ACTIVE, IN_PROGRESS, COMPLETED, CANCELLED
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class WorkflowStep(Base):
    __tablename__ = "workflow_steps"

    id = Column(Integer, primary_key=True, index=True)
    workflow_id = Column(Integer, ForeignKey("workflows.id"), nullable=False, index=True)
    step_number = Column(Integer, default=1)
    name = Column(String(200), nullable=False)
    action_type = Column(String(100), default="REVIEW")  # REVIEW, APPROVAL, TASK, NOTIFICATION
    assigned_role_id = Column(Integer, ForeignKey("roles.id"), nullable=True)
    assigned_department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)
    is_required = Column(Boolean, default=True)

class WorkflowInstance(Base):
    __tablename__ = "workflow_instances"

    id = Column(Integer, primary_key=True, index=True)
    workflow_id = Column(Integer, ForeignKey("workflows.id"), nullable=True)
    document_id = Column(String(100), ForeignKey("documents.id"), nullable=False, index=True)
    current_step_number = Column(Integer, default=1)
    status = Column(String(50), default="IN_PROGRESS")  # DRAFT, PENDING_CONFIRMATION, ACTIVE, IN_PROGRESS, WAITING_APPROVAL, COMPLETED, REJECTED, CANCELLED, OVERDUE, ESCALATED
    started_at = Column(DateTime, default=datetime.datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

class WorkflowRecommendation(Base):
    __tablename__ = "workflow_recommendations"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(String(100), ForeignKey("documents.id"), nullable=False, index=True)
    suggested_action = Column(String(255), nullable=False)
    reason = Column(Text, nullable=False)
    source_page = Column(Integer, default=1)
    recommended_department = Column(String(100), nullable=False)
    recommended_owner = Column(String(100), nullable=False)
    deadline = Column(String(100), nullable=True)
    priority = Column(String(50), default="Medium")
    confidence = Column(Float, default=95.0)
    status = Column(String(50), default="PENDING")  # PENDING, ACCEPTED, REJECTED, EDITED
    rejected_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    rejected_at = Column(DateTime, nullable=True)
    rejection_reason = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class TaskDependency(Base):
    __tablename__ = "task_dependencies"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"), nullable=False, index=True)
    depends_on_task_id = Column(Integer, ForeignKey("tasks.id"), nullable=False, index=True)

class ComplianceEvidence(Base):
    __tablename__ = "compliance_evidence"

    id = Column(Integer, primary_key=True, index=True)
    compliance_item_id = Column(Integer, ForeignKey("compliance_items.id"), nullable=False, index=True)
    file_name = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    uploaded_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    notes = Column(Text, nullable=True)
    uploaded_at = Column(DateTime, default=datetime.datetime.utcnow)

class ReminderEvent(Base):
    __tablename__ = "reminder_events"

    id = Column(Integer, primary_key=True, index=True)
    entity_type = Column(String(50), nullable=False)  # TASK, COMPLIANCE, APPROVAL
    entity_id = Column(String(100), nullable=False)
    reminder_type = Column(String(50), default="7_DAYS_BEFORE")
    status = Column(String(50), default="SCHEDULED")  # SCHEDULED, SENT, CANCELLED
    scheduled_for = Column(DateTime, nullable=False)
    sent_at = Column(DateTime, nullable=True)
