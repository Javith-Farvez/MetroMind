from pydantic import BaseModel, EmailStr
from typing import Optional

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int
    full_name: str
    email: str
    role: str
    department: Optional[str] = None

class UserRegisterRequest(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    password: str
    phone: Optional[str] = None
    role_name: str = "EMPLOYEE"
    department_name: Optional[str] = "Operations & Maintenance"
