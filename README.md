# 🚇 MetroFlow — KMRL Document Intelligence Platform

> **From thousands of pages to the information that matters.**

MetroFlow is an AI-powered document intelligence and decision-support platform designed around the document-heavy workflow of **Kochi Metro Rail Limited (KMRL)**.

The platform is designed to turn large volumes of operational and administrative documents into structured, searchable and actionable information — while preserving the original document, traceability, human approval and audit history.

---

## 🎯 Problem

KMRL handles documents such as:

- Engineering and maintenance reports
- Safety and inspection reports
- Procurement and tender documents
- Regulatory notices
- Vendor correspondence
- Operational records
- HR and administrative documents
- Scanned and multilingual documents

Important information can be buried inside long PDFs, scanned files and documents arriving from different sources.

MetroFlow addresses this information latency by creating a workflow:

```text
Document
   ↓
Upload / Import
   ↓
OCR & Text Extraction
   ↓
Language Detection
   ↓
Document Classification
   ↓
Metadata Extraction
   ↓
AI Summarization & Analysis
   ↓
Risk / Priority / Deadline
   ↓
Department Recommendation
   ↓
Human Accept / Reject
   ↓
Task & Audit Record
   ↓
Search / AI Intelligence / Analytics
```

---

## ✨ Key Capabilities

### 📄 Document Intelligence

- PDF, DOCX and image document ingestion
- PDF text extraction
- OCR support for scanned documents
- Page-aware document processing
- Document metadata extraction
- Document classification
- Duplicate detection
- Version/change analysis

### 🤖 AI Analysis

- Document summarization
- Key finding extraction
- Risk analysis
- Priority/urgency detection
- Action recommendation
- Department recommendation
- Source/page traceability
- AI document assistant
- Cross-document question answering
- Semantic/hybrid search

### 🌐 Multilingual Access

The platform is designed to support:

- English
- Malayalam
- Hindi
- Tamil
- Telugu
- Kannada
- Bengali
- Marathi

Original document content remains preserved while translated content can be generated separately.

### 🏢 Decision Workflow

AI recommendations remain subject to human review:

```text
AI Recommendation
       ↓
  Human Review
    ↙       ↘
 ACCEPT     REJECT
   ↓           ↓
Task       Reason Stored
   ↓           ↓
Audit       Audit
```

### 📊 Analytics

Analytics are designed to be database-driven rather than static:

- Documents by department
- Documents by language
- Priority distribution
- Risk distribution
- Document processing trends
- Approval/action statistics
- Dashboard counts

When records change, the corresponding counts and charts can be refreshed from PostgreSQL data.

### 🔎 Search & AI Intelligence

Users can search the document repository using:

- Keywords
- Document content
- Department
- Location
- Language
- Priority
- Risk
- Reference number
- Semantic queries

The AI assistant can return answers together with document/page sources for traceability.

---

## 🧠 Main Application Areas

| Area | Purpose |
|---|---|
| **Dashboard** | Operational overview and items needing attention |
| **Document Workspace** | Browse, upload and manage documents |
| **Document Viewer** | View original document pages and translated content |
| **Approvals** | Review AI recommendations and accept/reject them |
| **Department Workspace** | Organize information around departments |
| **AI Intelligence** | Ask questions across authorized documents |
| **Workflows** | Manage operational workflows |
| **Compliance** | Track compliance-related information |
| **Knowledge Base** | Access structured organizational knowledge |
| **Reports & Analytics** | Analyze real database-backed information |
| **Audit Logs** | Trace important user/system actions |
| **Settings** | Application configuration |

---

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────┐
│                 React Frontend              │
│       Vite + React + Tailwind + Motion      │
└──────────────────────┬──────────────────────┘
                       │ REST / WebSocket
                       ▼
┌─────────────────────────────────────────────┐
│                 FastAPI Backend              │
│                                              │
│ Auth │ Documents │ Search │ AI │ Analytics  │
│ Tasks │ Approvals │ Audit │ Translation      │
└───────────────┬───────────────┬─────────────┘
                │               │
                ▼               ▼
        ┌──────────────┐  ┌──────────────┐
        │ PostgreSQL   │  │ Redis        │
        │ Application  │  │ Cache/Queue  │
        │ Data         │  │              │
        └──────────────┘  └──────────────┘
                │
                ▼
        ┌──────────────┐
        │ MinIO /      │
        │ Object       │
        │ Storage      │
        └──────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- GSAP
- Lenis
- Lucide React
- Three.js

### Backend

- Python 3.12+
- FastAPI
- Uvicorn
- SQLAlchemy 2
- Alembic
- Pydantic Settings
- JWT authentication

### AI / NLP / Document Processing

- PyMuPDF
- Tesseract OCR / pytesseract
- python-docx
- OpenPyXL
- Pillow
- Sentence Transformers
- LangChain
- Semantic/hybrid search services
- Document summarization and analysis services

### Data & Infrastructure

- PostgreSQL
- Redis
- Celery
- MinIO object storage
- Docker / Docker Compose

---

## 📁 Project Structure

```text
MetroMind_AI/
│
├── backend/
│   ├── app/
│   │   ├── ai/
│   │   │   ├── assistant_service.py
│   │   │   ├── classification_service.py
│   │   │   ├── document_processor.py
│   │   │   ├── language_service.py
│   │   │   ├── ocr_service.py
│   │   │   ├── recommendation_engine.py
│   │   │   ├── risk_analyzer.py
│   │   │   ├── semantic_search.py
│   │   │   ├── summarization_service.py
│   │   │   └── ...
│   │   │
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── auth.py
│   │   │   │   ├── documents.py
│   │   │   │   ├── search.py
│   │   │   │   ├── analytics.py
│   │   │   │   ├── ai.py
│   │   │   │   ├── approvals.py
│   │   │   │   ├── tasks.py
│   │   │   │   ├── translations.py
│   │   │   │   └── ...
│   │   │   └── endpoints/
│   │   │
│   │   ├── core/
│   │   ├── models/
│   │   └── ...
│   │
│   ├── alembic.ini
│   ├── requirements.txt
│   ├── Dockerfile
│   └── main.py
│
├── src/
│   ├── components/
│   ├── views/
│   ├── api/
│   ├── services/
│   ├── data/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── docker-compose.yml
├── package.json
├── vite.config.js
└── .env.example
```

---

## 🚀 Local Setup

### Prerequisites

Install:

- Git
- Node.js 18+
- Python 3.12+
- Docker Desktop (recommended)

For the full infrastructure, Docker Compose runs:

- FastAPI backend
- PostgreSQL
- Redis
- MinIO
- Worker service

---

## 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd MetroMind_AI
```

---

## 2. Frontend setup

```bash
npm install
npm run dev
```

The Vite development server will normally run at:

```text
http://localhost:5173
```

Configure the frontend API URL in `.env`:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

---

## 3. Backend setup without Docker

Go to the backend:

```bash
cd backend
```

Create a virtual environment:

### Windows PowerShell

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Linux / macOS

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create `.env` from `.env.example` and configure your database and services.

Then run migrations:

```bash
python -m alembic upgrade head
```

Start FastAPI:

```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

API documentation:

```text
http://localhost:8000/docs
```

ReDoc:

```text
http://localhost:8000/redoc
```

Health endpoint:

```text
http://localhost:8000/api/v1/health
```

---

## 🐳 Docker Compose Setup

The repository includes a `docker-compose.yml` for the backend infrastructure.

From the project root:

```bash
docker compose up --build
```

Check running services:

```bash
docker compose ps
```

Expected services include:

```text
backend
postgres
redis
worker
minio
```

FastAPI:

```text
http://localhost:8000/docs
```

PostgreSQL:

```text
localhost:5432
```

Redis:

```text
localhost:6379
```

MinIO API:

```text
http://localhost:9000
```

MinIO Console:

```text
http://localhost:9001
```

---

## 🔐 Environment Variables

### Frontend

```env
VITE_API_URL=http://localhost:8000/api/v1
```

### Backend

Example:

```env
DATABASE_URL=postgresql+psycopg2://metrouser:metropass@localhost:5432/metromind
JWT_SECRET=change_this_in_production
CORS_ORIGINS=http://localhost:5173
REDIS_URL=redis://localhost:6379/0
STORAGE_URL=http://localhost:9000
STORAGE_ACCESS_KEY=minioadmin
STORAGE_SECRET_KEY=minioadmin
```

**Never commit real secrets, passwords, API keys or production credentials to GitHub.**

---

## 📑 Database & Migrations

Alembic is used for database migrations.

Run:

```bash
cd backend
python -m alembic upgrade head
```

When creating a new migration:

```bash
python -m alembic revision --autogenerate -m "describe_change"
```

Then:

```bash
python -m alembic upgrade head
```

---

## 📊 Real Data Workflow

MetroFlow is intended to work with real documents rather than hardcoded dashboard values.

### Document ingestion

```text
Upload / Import
      ↓
File validation
      ↓
Storage
      ↓
OCR / Text extraction
      ↓
Language detection
      ↓
Classification
      ↓
Metadata extraction
      ↓
AI analysis
      ↓
Priority / Risk / Deadline
      ↓
Department recommendation
      ↓
PostgreSQL
```

### Decision workflow

```text
AI Recommendation
       ↓
Human Review
   ┌───┴────┐
   ↓        ↓
ACCEPT    REJECT
   ↓        ↓
Task      Reason
   ↓        ↓
Audit     Audit
```

---

## 🌐 Public KMRL Data

For demonstrations and development, use **publicly available KMRL documents** and clearly preserve their source/provenance.

Examples include publicly available:

- Annual reports
- Tender documents
- Public notices
- Public reports

Do not represent public documents as confidential internal KMRL data.

For every imported source, preserve metadata such as:

```text
source_type
source_url
source_title
published_date
retrieved_at
```

For an institutional deployment, authorized internal KMRL documents can be ingested through the same document-processing pipeline inside the organization's secure environment.

---

## 🔎 Traceable AI

MetroFlow is designed around traceability.

An AI finding should be connected to its document and page where possible:

```text
AI Finding
    ↓
Document
    ↓
Page Number
    ↓
Source Text
```

This allows users to move from an AI-generated insight back to the original document instead of treating the AI response as an unsupported answer.

---

## 🌍 Multilingual Workflow

The intended multilingual workflow is:

```text
Original Document
       ↓
Language Detection
       ↓
Original Content Preserved
       ↓
Target Language Selected
       ↓
Translation
       ↓
Translated View
```

The original document should never be overwritten by the translated version.

Reference numbers, IDs, measurements and other identifiers should remain intact where translation would change their meaning.

---

## 📈 Database-Driven Analytics

Analytics should always be derived from stored application data.

For example, when a new document is processed:

```text
Documents: 10 → 11
```

If it is classified under Safety:

```text
Safety: 5 → 6
```

The corresponding dashboard counts and charts should be refreshed from backend/API data rather than manually edited frontend values.

---

## 🧪 Testing

Backend tests can be run with:

```bash
cd backend
python -m pytest
```

For a complete integration test, verify:

1. Upload a real document.
2. Confirm the document reaches the backend.
3. Confirm it is stored.
4. Confirm text/OCR processing.
5. Confirm language detection.
6. Confirm AI analysis.
7. Confirm recommendation.
8. Accept/reject the recommendation.
9. Confirm task creation.
10. Confirm audit event.
11. Confirm dashboard counts.
12. Confirm analytics update.
13. Refresh the application and verify persistence.

---

## 🚀 Production Deployment

A practical deployment architecture is:

```text
React / Vite
    ↓
Vercel or Static Hosting
    ↓
FastAPI
    ↓
Render / Cloud VM / Container Platform
    ↓
Managed PostgreSQL
    ↓
Redis
    ↓
Object Storage
```

For production:

- Use managed PostgreSQL.
- Use secure object storage.
- Store secrets in the hosting provider's secret manager/environment settings.
- Configure production CORS origins.
- Use HTTPS.
- Run Alembic migrations during deployment.
- Configure background workers for heavy OCR/AI processing.
- Add backups and monitoring.
- Never expose database credentials in frontend code.

---

## 🔒 Security Principles

MetroFlow handles potentially sensitive organizational documents. Production deployments should implement:

- Authentication
- Role-based access control
- Backend permission enforcement
- Secure password hashing
- JWT/session security
- HTTPS
- Restricted CORS
- Database access controls
- Secure object storage
- Audit logging
- Secret management
- Document access authorization

Never expose documents to users who do not have permission to access them.

---

## 🏆 SIH Project Context

**Organization:** Kochi Metro Rail Limited (KMRL)  
**Organization Type:** Government / Enterprise  
**Theme:** Smart Automation  
**Category:** Software  
**Technology Areas:** AI, ML, NLP, Data Analytics, Cloud Computing

### Expected Impact

- Reduce document-processing time
- Improve decision-making speed
- Reduce duplicated manual summarization
- Improve cross-department awareness
- Strengthen compliance tracking
- Preserve institutional knowledge
- Improve operational productivity
- Provide traceable AI-assisted decisions

---

## 🧭 Demo Story

A simple SIH demonstration flow:

```text
1. Open MetroFlow
       ↓
2. Upload / import a real public KMRL document
       ↓
3. Open the original document
       ↓
4. Navigate real document pages
       ↓
5. View extracted information
       ↓
6. View AI summary and findings
       ↓
7. View risk / priority / deadline
       ↓
8. See recommended department
       ↓
9. Change the document language
       ↓
10. Ask AI a question
       ↓
11. See answer + source page
       ↓
12. Accept / reject recommendation
       ↓
13. Task and audit record are created
       ↓
14. Dashboard counts update
       ↓
15. Analytics update from database data
```

The core message is:

> **MetroFlow turns document overload into actionable, traceable information.**

---

## 📌 Current Project Notes

The repository contains both frontend and backend components and a Docker Compose development environment.

The frontend is a Vite/React application, while the backend exposes a FastAPI API under `/api/v1` and provides interactive API documentation through `/docs`.

Before a production deployment, configure production PostgreSQL, object storage, Redis/worker infrastructure, authentication secrets, CORS, AI provider credentials and any required external integrations through environment variables.

---

## 👨‍💻 Development

Contributions and improvements should preserve the central product workflow:

```text
DOCUMENT
→ UNDERSTAND
→ ANALYZE
→ RECOMMEND
→ DECIDE
→ STORE
→ SEARCH
```

Avoid adding unnecessary UI or features that make the core workflow harder to understand.

---

## 📄 License

Add the project's chosen license here before publishing the repository publicly.

---

## 🚇 MetroFlow

**KMRL Document Intelligence & Decision Support Platform**

> **Read less. Understand more. Decide faster.**
