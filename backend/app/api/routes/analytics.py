from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Dict, List, Any
from app.core.database import get_db
from app.schemas.analytics import AnalyticsOverviewResponse
from app.services.analytics_service import analytics_service

router = APIRouter(tags=["Executive Analytics & Dashboard"])

@router.get("/dashboard/summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    return analytics_service.get_dashboard_summary(db)

@router.get("/analytics/overview", response_model=AnalyticsOverviewResponse)
def get_overview(db: Session = Depends(get_db)):
    return analytics_service.get_overview(db)

@router.get("/analytics/documents-by-department")
@router.get("/analytics/departments")
def get_documents_by_department(db: Session = Depends(get_db)):
    return analytics_service.get_documents_by_department(db)

@router.get("/analytics/documents-by-language")
@router.get("/analytics/languages")
def get_documents_by_language(db: Session = Depends(get_db)):
    return analytics_service.get_documents_by_language(db)

@router.get("/analytics/risk-distribution")
@router.get("/analytics/risks")
def get_risk_distribution(db: Session = Depends(get_db)):
    return analytics_service.get_risk_distribution(db)

@router.get("/analytics/priorities")
def get_priorities_distribution(db: Session = Depends(get_db)):
    return analytics_service.get_risk_distribution(db)

@router.get("/analytics/document-trend")
@router.get("/analytics/trends")
def get_document_trend(db: Session = Depends(get_db)):
    return analytics_service.get_document_trend(db)

@router.get("/analytics/actions")
def get_actions_analytics(db: Session = Depends(get_db)):
    summary = analytics_service.get_dashboard_summary(db)
    return {
        "pending": summary["pending_review"],
        "accepted": summary["accepted_recommendations"],
        "rejected": summary["rejected_recommendations"]
    }
