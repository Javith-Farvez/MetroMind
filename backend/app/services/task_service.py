from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse

class TaskService:
    def list_tasks(self, db: Session, user_id: Optional[int] = None) -> List[TaskResponse]:
        query = db.query(Task)
        if user_id:
            query = query.filter(Task.assigned_to == user_id)
        tasks = query.order_by(Task.created_at.desc()).all()
        
        res = []
        for t in tasks:
            assignee = t.assignee.full_name if t.assignee else "Operations Lead"
            dept = t.department.name if t.department else "Operations & Maintenance"
            res.append(TaskResponse(
                id=t.id,
                title=t.title,
                description=t.description,
                created_by=t.created_by,
                assigned_to=t.assigned_to,
                department_id=t.department_id,
                document_id=t.document_id,
                priority=t.priority or "Medium",
                status=t.status or "TODO",
                due_date=t.due_date,
                created_at=t.created_at,
                updated_at=t.updated_at,
                assignee_name=assignee,
                department_name=dept
            ))
        return res

    def create_task(self, db: Session, req: TaskCreate, creator_id: int) -> TaskResponse:
        new_task = Task(
            title=req.title,
            description=req.description,
            created_by=creator_id,
            assigned_to=req.assigned_to,
            department_id=req.department_id,
            document_id=req.document_id,
            priority=req.priority,
            status="TODO",
            due_date=req.due_date
        )
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        return TaskResponse.model_validate(new_task)

    def update_task(self, db: Session, task_id: int, req: TaskUpdate) -> TaskResponse:
        task = db.query(Task).filter(Task.id == task_id).first()
        if not task:
            raise Exception("Task not found")

        if req.title is not None: task.title = req.title
        if req.description is not None: task.description = req.description
        if req.assigned_to is not None: task.assigned_to = req.assigned_to
        if req.priority is not None: task.priority = req.priority
        if req.status is not None: task.status = req.status
        if req.due_date is not None: task.due_date = req.due_date

        db.commit()
        db.refresh(task)
        return TaskResponse.model_validate(task)

task_service = TaskService()
