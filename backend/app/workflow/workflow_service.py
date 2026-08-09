from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException
import datetime

from app.models.workflow import WorkflowRecommendation, TaskDependency, ComplianceEvidence, WorkflowInstance
from app.models.task import Task
from app.models.approval import Approval
from app.models.compliance import ComplianceItem
from app.models.document import Document
from app.models.department import Department
from app.models.audit_log import AuditLog
from app.models.notification import Notification
from app.schemas.workflow import WorkflowRecommendationResponse, RecommendationAcceptRequest, RecommendationEditRequest
from app.workflow.workflow_rules import workflow_rule_engine

class WorkflowService:
    def generate_recommendations(self, db: Session, document_id: str) -> List[WorkflowRecommendation]:
        doc = db.query(Document).filter(Document.id == document_id).first()
        if not doc:
            raise HTTPException(status_code=404, detail="Document not found")

        dept_name = doc.department.name if doc.department else "Operations & Maintenance"
        rules_res = workflow_rule_engine.evaluate_rules(doc.document_category or "General", doc.description or "", doc.priority or "Medium")

        # Create AI Workflow Recommendation requiring human confirmation
        rec = db.query(WorkflowRecommendation).filter(WorkflowRecommendation.document_id == document_id, WorkflowRecommendation.status == "PENDING").first()
        if not rec:
            rec = WorkflowRecommendation(
                document_id=document_id,
                suggested_action=f"Review & execute operational directive: {doc.title}",
                reason=f"Priority is {doc.priority} because document concerns safety or rolling stock maintenance guidelines.",
                source_page=1,
                recommended_department=rules_res["target_department"],
                recommended_owner=f"{rules_res['target_department']} Lead",
                deadline="Within 48 hours",
                priority=doc.priority or "Medium",
                confidence=96.5,
                status="PENDING"
            )
            db.add(rec)
            db.commit()
            db.refresh(rec)
        return [rec]

    def accept_recommendation(self, db: Session, recommendation_id: int, user_id: int, req: RecommendationAcceptRequest) -> Dict[str, Any]:
        rec = db.query(WorkflowRecommendation).filter(WorkflowRecommendation.id == recommendation_id).first()
        if not rec:
            raise HTTPException(status_code=404, detail="Recommendation not found")

        rec.status = "ACCEPTED"
        
        # 1. Create Real Task in DB
        doc = db.query(Document).filter(Document.id == rec.document_id).first()
        dept_obj = db.query(Department).filter(Department.name == rec.recommended_department).first()

        new_task = Task(
            title=rec.suggested_action,
            description=f"{rec.reason} (Source: {doc.title if doc else rec.document_id}, Page {rec.source_page})",
            document_id=rec.document_id,
            department_id=dept_obj.id if dept_obj else None,
            created_by=user_id,
            assigned_to=req.assigned_user_id or user_id,
            priority=rec.priority,
            status="TODO",
            due_date=datetime.datetime.utcnow() + datetime.timedelta(days=2)
        )
        db.add(new_task)
        db.commit()
        db.refresh(new_task)

        # 2. Create Multi-Level Approval if High/Critical Priority
        approval_id = None
        if rec.priority in ["CRITICAL", "HIGH"]:
            appr = Approval(
                document_id=rec.document_id,
                requested_by=user_id,
                status="PENDING",
                comments=f"Automated approval required for High Priority action: {rec.suggested_action}"
            )
            db.add(appr)
            db.commit()
            db.refresh(appr)
            approval_id = appr.id

        # 3. Create Audit Log
        audit = AuditLog(
            user_id=user_id,
            action="WORKFLOW_RECOMMENDATION_ACCEPTED",
            entity_type="Task",
            entity_id=str(new_task.id),
            log_metadata={"recommendation_id": recommendation_id, "task_id": new_task.id}
        )
        db.add(audit)
        db.commit()

        return {
            "message": "Workflow Recommendation Accepted & Task Generated",
            "task_id": new_task.id,
            "approval_id": approval_id,
            "status": "ACCEPTED"
        }

    def reject_recommendation(self, db: Session, recommendation_id: int, user_id: int, rejection_reason: str = None) -> Dict[str, Any]:
        rec = db.query(WorkflowRecommendation).filter(WorkflowRecommendation.id == recommendation_id).first()
        if not rec:
            raise HTTPException(status_code=404, detail="Recommendation not found")

        rec.status = "REJECTED"
        rec.rejected_by = user_id
        rec.rejected_at = datetime.datetime.utcnow()
        rec.rejection_reason = rejection_reason or "No reason provided"

        audit = AuditLog(
            user_id=user_id,
            action="WORKFLOW_RECOMMENDATION_REJECTED",
            entity_type="WorkflowRecommendation",
            entity_id=str(recommendation_id),
            log_metadata={"rejection_reason": rejection_reason or "No reason provided"}
        )
        db.add(audit)
        db.commit()
        return {"message": "Recommendation Rejected", "status": "REJECTED", "rejection_reason": rejection_reason}


    def edit_recommendation(self, db: Session, recommendation_id: int, req: RecommendationEditRequest) -> WorkflowRecommendation:
        rec = db.query(WorkflowRecommendation).filter(WorkflowRecommendation.id == recommendation_id).first()
        if not rec:
            raise HTTPException(status_code=404, detail="Recommendation not found")

        if req.suggested_action: rec.suggested_action = req.suggested_action
        if req.recommended_department: rec.recommended_department = req.recommended_department
        if req.recommended_owner: rec.recommended_owner = req.recommended_owner
        if req.priority: rec.priority = req.priority
        if req.deadline: rec.deadline = req.deadline

        rec.status = "EDITED"
        db.commit()
        db.refresh(rec)
        return rec

    def upload_compliance_evidence(self, db: Session, compliance_id: int, file_name: str, file_path: str, user_id: int, notes: str = None) -> ComplianceEvidence:
        ev = ComplianceEvidence(
            compliance_item_id=compliance_id,
            file_name=file_name,
            file_path=file_path,
            uploaded_by=user_id,
            notes=notes,
            uploaded_at=datetime.datetime.utcnow()
        )
        db.add(ev)

        # Update Compliance Status
        comp = db.query(ComplianceItem).filter(ComplianceItem.id == compliance_id).first()
        if comp:
            comp.status = "SUBMITTED"

        audit = AuditLog(
            user_id=user_id,
            action="COMPLIANCE_EVIDENCE_UPLOADED",
            entity_type="ComplianceItem",
            entity_id=str(compliance_id),
            log_metadata={"file_name": file_name}
        )
        db.add(audit)
        db.commit()
        db.refresh(ev)
        return ev

workflow_service = WorkflowService()
