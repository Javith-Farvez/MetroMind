from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.task import Task

class TaskRepository:
    def get_by_id(self, db: Session, task_id: int) -> Optional[Task]:
        return db.query(Task).filter(Task.id == task_id).first()

    def list_all(self, db: Session, user_id: Optional[int] = None, status: Optional[str] = None) -> List[Task]:
        query = db.query(Task)
        if user_id:
            query = query.filter(Task.assigned_to == user_id)
        if status:
            query = query.filter(Task.status == status)
        return query.order_by(Task.created_at.desc()).all()

    def create(self, db: Session, task: Task) -> Task:
        db.add(task)
        db.commit()
        db.refresh(task)
        return task

    def update(self, db: Session, task: Task) -> Task:
        db.commit()
        db.refresh(task)
        return task

task_repository = TaskRepository()
