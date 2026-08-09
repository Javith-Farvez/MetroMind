from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.department import Department
from app.schemas.department import DepartmentResponse, DepartmentCreate

router = APIRouter(prefix="/departments", tags=["Department Workspaces"])

@router.get("/", response_model=List[DepartmentResponse])
def list_departments(db: Session = Depends(get_db)):
    depts = db.query(Department).all()
    return [DepartmentResponse.model_validate(d) for d in depts]

@router.post("/", response_model=DepartmentResponse)
def create_department(data: DepartmentCreate, db: Session = Depends(get_db)):
    dept = Department(
        name=data.name,
        code=data.code,
        description=data.description,
        head_user_id=data.head_user_id
    )
    db.add(dept)
    db.commit()
    db.refresh(dept)
    return DepartmentResponse.model_validate(dept)
