from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.document import Document
from app.models.department import Department
from app.models.task import Task
from app.models.approval import Approval
from app.models.compliance import ComplianceItem
from app.models.deadline import Deadline
from app.models.ai_analysis import AIAnalysis
from app.schemas.analytics import AnalyticsOverviewResponse

from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Dict, List, Any
from app.models.document import Document
from app.models.department import Department
from app.models.task import Task
from app.models.approval import Approval
from app.models.workflow import WorkflowRecommendation
from app.models.compliance import ComplianceItem
from app.models.deadline import Deadline
from app.models.ai_analysis import AIAnalysis
from app.schemas.analytics import AnalyticsOverviewResponse

class AnalyticsService:
    def get_dashboard_summary(self, db: Session) -> Dict[str, Any]:
        total_docs = db.query(func.count(Document.id)).scalar() or 0
        proc_docs = db.query(func.count(Document.id)).filter(Document.status != "Pending").scalar() or 0
        
        pending_recs = db.query(func.count(WorkflowRecommendation.id)).filter(WorkflowRecommendation.status == "PENDING").scalar() or 0
        accepted_recs = db.query(func.count(WorkflowRecommendation.id)).filter(WorkflowRecommendation.status == "ACCEPTED").scalar() or 0
        rejected_recs = db.query(func.count(WorkflowRecommendation.id)).filter(WorkflowRecommendation.status == "REJECTED").scalar() or 0
        
        high_prio = db.query(func.count(Document.id)).filter(Document.priority.in_(["HIGH", "High", "URGENT", "Urgent"])).scalar() or 0
        crit_docs = db.query(func.count(Document.id)).filter(Document.priority.in_(["CRITICAL", "Critical"])).scalar() or 0
        
        active_tsks = db.query(func.count(Task.id)).filter(Task.status.in_(["TODO", "IN_PROGRESS", "REVIEW"])).scalar() or 0
        deadlines_cnt = db.query(func.count(Deadline.id)).filter(Deadline.status == "PENDING").scalar() or 0

        return {
            "total_documents": total_docs,
            "processed_documents": proc_docs,
            "pending_review": pending_recs,
            "pending_approvals": pending_recs,
            "high_priority": high_prio,
            "critical_documents": crit_docs,
            "upcoming_deadlines": deadlines_cnt,
            "accepted_recommendations": accepted_recs,
            "rejected_recommendations": rejected_recs,
            "active_tasks": active_tsks
        }

    def get_overview(self, db: Session) -> AnalyticsOverviewResponse:
        summary = self.get_dashboard_summary(db)
        total_docs = summary["total_documents"]
        high_risk_alerts = summary["high_priority"] + summary["critical_documents"]

        dept_records = db.query(Department.name, func.count(Document.id))\
            .outerjoin(Document, Department.id == Document.department_id)\
            .group_by(Department.name).all()
        dept_counts = {name: count for name, count in dept_records if name} if dept_records else {}

        all_docs = db.query(Document.created_at).all()
        month_map = {}
        for d in all_docs:
            m_str = d.created_at.strftime("%Y-%m") if d.created_at else "2026-08"
            month_map[m_str] = month_map.get(m_str, 0) + 1

        monthly_volumes = [{"month": m, "count": c} for m, c in sorted(month_map.items())] if month_map else [{"month": "2026-08", "count": total_docs}]

        return AnalyticsOverviewResponse(
            total_documents=total_docs,
            processed_documents=summary["processed_documents"],
            pending_approvals=summary["pending_review"],
            overdue_tasks=summary["active_tasks"],
            compliance_rate=100.0 if total_docs == 0 else round(min(100.0, max(0.0, ((total_docs - high_risk_alerts) / total_docs) * 100)), 1),
            high_risk_alerts=high_risk_alerts,
            department_document_counts=dept_counts,
            monthly_volumes=monthly_volumes
        )

    def get_documents_by_department(self, db: Session) -> List[Dict[str, Any]]:
        records = db.query(Department.name, func.count(Document.id))\
            .outerjoin(Document, Department.id == Document.department_id)\
            .group_by(Department.name).all()
        return [{"department": r[0] or "General", "count": r[1]} for r in records]

    def get_documents_by_language(self, db: Session) -> List[Dict[str, Any]]:
        records = db.query(Document.language, func.count(Document.id)).group_by(Document.language).all()
        return [{"language": r[0] or "English", "count": r[1]} for r in records]

    def get_risk_distribution(self, db: Session) -> Dict[str, int]:
        records = db.query(Document.priority, func.count(Document.id)).group_by(Document.priority).all()
        dist = {"Critical": 0, "High": 0, "Medium": 0, "Low": 0}
        for prio, cnt in records:
            if not prio: continue
            p_upper = prio.upper()
            if p_upper == "CRITICAL": dist["Critical"] += cnt
            elif p_upper in ["HIGH", "URGENT"]: dist["High"] += cnt
            elif p_upper == "MEDIUM": dist["Medium"] += cnt
            else: dist["Low"] += cnt
        return dist

    def get_document_trend(self, db: Session) -> List[Dict[str, Any]]:
        all_docs = db.query(Document.created_at).all()
        month_map = {}
        for d in all_docs:
            m_str = d.created_at.strftime("%b %Y") if d.created_at else "Aug 2026"
            month_map[m_str] = month_map.get(m_str, 0) + 1
        return [{"month": m, "count": c} for m, c in month_map.items()]

analytics_service = AnalyticsService()
