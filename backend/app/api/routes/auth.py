from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.auth import LoginRequest, TokenResponse, UserRegisterRequest
from app.services.auth_service import auth_service
from app.schemas.user import UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication & Access Control"])

@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    return auth_service.authenticate_user(db, data)

@router.post("/register", response_model=UserResponse)
def register(data: UserRegisterRequest, db: Session = Depends(get_db)):
    return auth_service.register_user(db, data)

@router.post("/logout")
def logout():
    return {"message": "User successfully logged out"}
