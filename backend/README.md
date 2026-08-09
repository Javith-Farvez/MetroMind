# MetroFlow — Backend Microservice & Database Architecture

Production-grade Python 3.12+ FastAPI backend for Kochi Metro Rail Limited (KMRL) Enterprise Decision Platform.

## System Tech Stack
- **Framework**: FastAPI (Python 3.12+)
- **Database ORM**: SQLAlchemy 2.x & Alembic
- **Database Engine**: PostgreSQL (Supported with SQLite local fallback)
- **Security**: JWT OAuth2 & Salted Hashing
- **Containerization**: Docker Compose (FastAPI, Postgres, Redis, MinIO)

## Environment Setup & Seeding

1. **Install Dependencies**
```bash
python -m venv .venv
# Activate virtual environment
pip install -r requirements.txt
```

2. **Configure Environment Variables**
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

3. **Run Alembic Migrations & Seeding**
```bash
python -m alembic upgrade head
python seed.py
```

4. **Launch Local Server**
```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## API Documentation
- **Interactive Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Integration Tests
```bash
python -m pytest tests/test_api.py
```
