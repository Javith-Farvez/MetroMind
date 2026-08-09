from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
import datetime

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.search_history import SearchHistory
from app.models.saved_search import SavedSearch
from app.schemas.search import SearchRequest, SearchResponse, SavedSearchCreate, SavedSearchResponse, SearchHistoryResponse
from app.ai.hybrid_search_engine import hybrid_search_engine

router = APIRouter(prefix="/search", tags=["Hybrid Smart Search Engine"])

@router.post("/", response_model=SearchResponse)
def execute_hybrid_search(
    req: SearchRequest, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    # Record query into search history
    history_entry = SearchHistory(
        user_id=current_user.id if current_user else None,
        query=req.query,
        created_at=datetime.datetime.utcnow()
    )
    db.add(history_entry)
    db.commit()

    role_name = current_user.role.name if (current_user and current_user.role) else "ADMIN"
    user_dept_id = current_user.department_id if current_user else None

    return hybrid_search_engine.search(
        db=db,
        query=req.query,
        filters=req.filters,
        user_role=role_name,
        user_department_id=user_dept_id,
        limit=req.page_size
    )

@router.get("/history", response_model=List[SearchHistoryResponse])
def get_search_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    items = db.query(SearchHistory).filter(SearchHistory.user_id == current_user.id).order_by(SearchHistory.created_at.desc()).limit(20).all()
    return items

@router.delete("/history/{history_id}")
def delete_search_history(
    history_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    entry = db.query(SearchHistory).filter(SearchHistory.id == history_id, SearchHistory.user_id == current_user.id).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Search history entry not found")
    db.delete(entry)
    db.commit()
    return {"message": "Search history item deleted"}

@router.get("/saved", response_model=List[SavedSearchResponse])
def get_saved_searches(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(SavedSearch).filter(SavedSearch.user_id == current_user.id).all()

@router.post("/saved", response_model=SavedSearchResponse)
def create_saved_search(
    req: SavedSearchCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    saved = SavedSearch(
        user_id=current_user.id,
        name=req.name,
        query=req.query,
        filters=req.filters,
        created_at=datetime.datetime.utcnow()
    )
    db.add(saved)
    db.commit()
    db.refresh(saved)
    return saved

@router.delete("/saved/{saved_id}")
def delete_saved_search(
    saved_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    saved = db.query(SavedSearch).filter(SavedSearch.id == saved_id, SavedSearch.user_id == current_user.id).first()
    if not saved:
        raise HTTPException(status_code=404, detail="Saved search not found")
    db.delete(saved)
    db.commit()
    return {"message": "Saved search deleted"}
