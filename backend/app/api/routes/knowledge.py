from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from app.core.database import get_db
from app.services.knowledge_service import knowledge_service

router = APIRouter(tags=["KMRL Knowledge Graph Engine"])

@router.get("/knowledge/documents/{document_id}")
def get_document_knowledge(document_id: str, db: Session = Depends(get_db)):
    return knowledge_service.get_document_graph(db, document_id)

@router.get("/knowledge/entity/{entity_type}/{entity_id}")
def get_entity_knowledge(entity_type: str, entity_id: str, db: Session = Depends(get_db)):
    return knowledge_service.get_entity_knowledge(db, entity_type, entity_id)

@router.post("/knowledge/explore")
def explore_knowledge_graph(
    req: Dict[str, Any],
    db: Session = Depends(get_db)
):
    entity_type = req.get("entity_type", "Document")
    entity_id = req.get("entity_id", "KMRL-ENG-8812")
    depth = req.get("depth", 2)
    return knowledge_service.explore_graph(db, entity_type, entity_id, depth)

@router.get("/documents/{document_id}/similar")
def get_similar_documents(document_id: str, db: Session = Depends(get_db)):
    return knowledge_service.get_similar_documents(db, document_id)
