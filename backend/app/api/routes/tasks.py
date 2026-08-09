from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse
from app.services.task_service import task_service
from app.models.task import Task
from app.models.comment import Comment

router = APIRouter(prefix="/tasks", tags=["Task Management & Workflows"])

@router.get("/", response_model=List[TaskResponse])
def list_tasks(user_id: Optional[int] = None, db: Session = Depends(get_db)):
    return task_service.list_tasks(db, user_id)

@router.post("/", response_model=TaskResponse)
def create_task(req: TaskCreate, creator_id: int = 1, db: Session = Depends(get_db)):
    return task_service.create_task(db, req, creator_id)

@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, req: TaskUpdate, db: Session = Depends(get_db)):
    return task_service.update_task(db, task_id, req)

@router.post("/{task_id}/assign")
def assign_task(task_id: int, assigned_to_user_id: int, db: Session = Depends(get_db)):
    t = db.query(Task).filter(Task.id == task_id).first()
    if not t:
        raise HTTPException(status_code=404, detail="Task not found")
    t.assigned_to = assigned_to_user_id
    db.commit()
    return {"message": "Task assigned successfully", "task_id": task_id, "assigned_to": assigned_to_user_id}

@router.post("/{task_id}/complete")
def complete_task(task_id: int, db: Session = Depends(get_db)):
    t = db.query(Task).filter(Task.id == task_id).first()
    if not t:
        raise HTTPException(status_code=404, detail="Task not found")
    t.status = "COMPLETED"
    db.commit()
    return {"message": "Task completed successfully", "task_id": task_id}

@router.post("/{task_id}/reopen")
def reopen_task(task_id: int, db: Session = Depends(get_db)):
    t = db.query(Task).filter(Task.id == task_id).first()
    if not t:
        raise HTTPException(status_code=404, detail="Task not found")
    t.status = "IN_PROGRESS"
    db.commit()
    return {"message": "Task reopened successfully", "task_id": task_id}

@router.post("/{task_id}/comments")
def add_task_comment(task_id: int, text: str, user_id: int = 1, db: Session = Depends(get_db)):
    t = db.query(Task).filter(Task.id == task_id).first()
    if not t:
        raise HTTPException(status_code=404, detail="Task not found")
    cmt = Comment(document_id=t.document_id, user_id=user_id, comment=f"[Task #{task_id}] {text}")
    db.add(cmt)
    db.commit()
    return {"message": "Comment added to task", "task_id": task_id}
