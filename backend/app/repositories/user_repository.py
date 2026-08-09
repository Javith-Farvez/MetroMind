from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.user import User

class UserRepository:
    def get_by_id(self, db: Session, user_id: int) -> Optional[User]:
        return db.query(User).filter(User.id == user_id).first()

    def get_by_email(self, db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def get_by_employee_id(self, db: Session, emp_id: str) -> Optional[User]:
        return db.query(User).filter(User.employee_id == emp_id).first()

    def list_all(self, db: Session, skip: int = 0, limit: int = 100) -> List[User]:
        return db.query(User).offset(skip).limit(limit).all()

    def create(self, db: Session, user: User) -> User:
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

user_repository = UserRepository()
