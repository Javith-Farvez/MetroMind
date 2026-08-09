from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.security import get_current_user
from app.schemas.user import UserResponse, UserCreate, UserUpdate
from app.repositories.user_repository import user_repository
from app.models.user import User

router = APIRouter(prefix="/users", tags=["User Management"])

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return UserResponse(
        id=current_user.id,
        employee_id=current_user.employee_id,
        full_name=current_user.full_name,
        email=current_user.email,
        phone=current_user.phone,
        role_id=current_user.role_id,
        department_id=current_user.department_id,
        is_active=current_user.is_active,
        last_login=current_user.last_login,
        created_at=current_user.created_at,
        role_name=current_user.role.name if current_user.role else "EMPLOYEE",
        department_name=current_user.department.name if current_user.department else "Operations"
    )

@router.get("/", response_model=List[UserResponse])
def list_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = user_repository.list_all(db, skip, limit)
    res = []
    for u in users:
        res.append(UserResponse(
            id=u.id,
            employee_id=u.employee_id,
            full_name=u.full_name,
            email=u.email,
            phone=u.phone,
            role_id=u.role_id,
            department_id=u.department_id,
            is_active=u.is_active,
            last_login=u.last_login,
            created_at=u.created_at,
            role_name=u.role.name if u.role else "EMPLOYEE",
            department_name=u.department.name if u.department else "Operations"
        ))
    return res

@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    u = user_repository.get_by_id(db, user_id)
    if not u:
        raise HTTPException(status_code=404, detail="User not found")
    return UserResponse(
        id=u.id,
        employee_id=u.employee_id,
        full_name=u.full_name,
        email=u.email,
        phone=u.phone,
        role_id=u.role_id,
        department_id=u.department_id,
        is_active=u.is_active,
        last_login=u.last_login,
        created_at=u.created_at,
        role_name=u.role.name if u.role else "EMPLOYEE",
        department_name=u.department.name if u.department else "Operations"
    )
