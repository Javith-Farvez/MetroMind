import datetime
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.repositories.user_repository import user_repository
from app.core.security import verify_password, hash_password, create_access_token
from app.schemas.auth import LoginRequest, TokenResponse, UserRegisterRequest
from app.models.user import User
from app.models.role import Role
from app.models.department import Department

class AuthService:
    def authenticate_user(self, db: Session, login_data: LoginRequest) -> TokenResponse:
        user = user_repository.get_by_email(db, login_data.email)
        if not user or not verify_password(login_data.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        # Update last login timestamp
        user.last_login = datetime.datetime.utcnow()
        db.commit()

        role_name = user.role.name if user.role else "EMPLOYEE"
        dept_name = user.department.name if user.department else "General"

        token = create_access_token(user.id)
        return TokenResponse(
            access_token=token,
            user_id=user.id,
            full_name=user.full_name,
            email=user.email,
            role=role_name,
            department=dept_name
        )

    def register_user(self, db: Session, req: UserRegisterRequest) -> User:
        if user_repository.get_by_email(db, req.email):
            raise HTTPException(status_code=400, detail="Email already registered")

        # Find or link default role
        role = db.query(Role).filter(Role.name == req.role_name).first()
        dept = db.query(Department).filter(Department.name == req.department_name).first()

        new_user = User(
            employee_id=req.employee_id,
            full_name=req.full_name,
            email=req.email,
            phone=req.phone,
            password_hash=hash_password(req.password),
            role_id=role.id if role else None,
            department_id=dept.id if dept else None
        )
        return user_repository.create(db, new_user)

auth_service = AuthService()
