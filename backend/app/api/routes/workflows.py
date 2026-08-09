from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.workflow import Workflow, WorkflowInstance, WorkflowRecommendation
from app.schemas.workflow import (
    WorkflowResponse,
    WorkflowRecommendationResponse,
    RecommendationAcceptRequest,
    RecommendationRejectRequest,
    RecommendationEditRequest
)
from app.workflow.workflow_service import workflow_service

router = APIRouter(tags=["KMRL Workflow Intelligence Engine"])

@router.get("/workflows", response_model=List[WorkflowResponse])
def list_workflows(db: Session = Depends(get_db)):
    return db.query(Workflow).all()

@router.post("/workflows", response_model=WorkflowResponse)
def create_workflow(
    name: str,
    description: Optional[str] = None,
    trigger_type: str = "DOCUMENT_INGESTED",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    wf = Workflow(name=name, description=description, trigger_type=trigger_type, created_by=current_user.id)
    db.add(wf)
    db.commit()
    db.refresh(wf)
    return wf

@router.get("/workflows/{workflow_id}", response_model=WorkflowResponse)
def get_workflow(workflow_id: int, db: Session = Depends(get_db)):
    wf = db.query(Workflow).filter(Workflow.id == workflow_id).first()
    if not wf:
        raise HTTPException(status_code=404, detail="Workflow not found")
    return wf

@router.post("/workflows/{workflow_id}/start")
def start_workflow(workflow_id: int, document_id: str, db: Session = Depends(get_db)):
    wf = db.query(Workflow).filter(Workflow.id == workflow_id).first()
    if not wf:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    inst = WorkflowInstance(workflow_id=workflow_id, document_id=document_id, status="IN_PROGRESS")
    db.add(inst)
    db.commit()
    db.refresh(inst)
    return {"message": "Workflow started", "instance_id": inst.id}

@router.get("/documents/{document_id}/workflow-recommendations", response_model=List[WorkflowRecommendationResponse])
def get_workflow_recommendations(document_id: str, db: Session = Depends(get_db)):
    return workflow_service.generate_recommendations(db, document_id)

@router.post("/workflow-recommendations/{recommendation_id}/accept")
def accept_recommendation(
    recommendation_id: int,
    req: RecommendationAcceptRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return workflow_service.accept_recommendation(db, recommendation_id, current_user.id, req)

@router.post("/workflow-recommendations/{recommendation_id}/reject")
def reject_recommendation(
    recommendation_id: int,
    req: RecommendationRejectRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return workflow_service.reject_recommendation(db, recommendation_id, current_user.id, req.rejection_reason)

@router.put("/workflow-recommendations/{recommendation_id}", response_model=WorkflowRecommendationResponse)
def edit_recommendation(
    recommendation_id: int,
    req: RecommendationEditRequest,
    db: Session = Depends(get_db)
):
    return workflow_service.edit_recommendation(db, recommendation_id, req)
