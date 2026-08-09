from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
import datetime, hashlib
from app.core.database import get_db
from app.models.source import DataSource, IngestionRun, IngestionError, DocumentProvenance
from app.models.document import Document
from app.schemas.source import DataSourceResponse, IngestionRunResponse, IngestionErrorResponse
from app.services.ingestion.ingestion_pipeline import ingestion_pipeline

router = APIRouter(prefix="/sources", tags=["KMRL Data Sources & Ingestion Control"])

class PublicImportRequest(BaseModel):
    source_url: str
    source_title: str
    organization: Optional[str] = "Kochi Metro Rail Limited"
    published_date: Optional[str] = None

@router.get("/", response_model=List[DataSourceResponse])
def list_sources(db: Session = Depends(get_db)):
    sources = db.query(DataSource).all()
    if not sources:
        # Seed initial official KMRL source record
        ds = DataSource(
            name="KMRL Official Portal (kochimetro.org)",
            base_url="https://kochimetro.org/",
            source_type="PUBLIC_KMRL_PORTAL",
            status="IDLE"
        )
        db.add(ds)
        db.commit()
        db.refresh(ds)
        sources = [ds]
    return sources

@router.post("/import-public")
def import_public_kmrl_document(req: PublicImportRequest, db: Session = Depends(get_db)):
    """Admin-only: Import a publicly accessible KMRL document with provenance tagging."""
    try:
        # Create a Document shell record
        doc_id = f"KMRL-PUB-{datetime.datetime.utcnow().strftime('%Y%m%d%H%M%S')}"
        new_doc = Document(
            id=doc_id,
            title=req.source_title,
            description=f"Public KMRL document imported from {req.source_url}",
            document_category="PUBLIC_DIRECTIVE",
            status="Ingested & Indexed",
            priority="MEDIUM",
            language="English",
            source_type="PUBLIC_KMRL_SOURCE",
            created_at=datetime.datetime.utcnow(),
            updated_at=datetime.datetime.utcnow()
        )
        db.add(new_doc)
        db.flush()  # Get the ID without committing yet

        # Create provenance record with required fields
        content_hash = hashlib.sha256(f"{doc_id}{req.source_url}".encode()).hexdigest()
        provenance = DocumentProvenance(
            document_id=doc_id,
            source_type="PUBLIC_KMRL_SOURCE",
            source_url=req.source_url,
            source_domain="kochimetro.org",
            source_title=req.source_title,
            publisher=req.organization or "Kochi Metro Rail Limited",
            retrieved_at=datetime.datetime.utcnow(),
            content_hash=content_hash,
            original_file_name=f"{doc_id}.html",
            original_download_url=req.source_url,
            collection_method="ADMIN_IMPORT"
        )
        db.add(provenance)
        db.commit()
        db.refresh(new_doc)

        return {
            "message": "Public KMRL document imported successfully",
            "document_id": doc_id,
            "source_url": req.source_url,
            "source_type": "PUBLIC_KMRL_SOURCE",
            "title": req.source_title
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Import failed: {str(e)}")

@router.get("/{source_id}", response_model=DataSourceResponse)
def get_source(source_id: int, db: Session = Depends(get_db)):
    ds = db.query(DataSource).filter(DataSource.id == source_id).first()
    if not ds:
        raise HTTPException(status_code=404, detail="Data source not found")
    return ds

@router.post("/{source_id}/sync")
def sync_source(source_id: int, db: Session = Depends(get_db)):
    return ingestion_pipeline.trigger_sync(db, source_id)

@router.get("/ingestion/runs", response_model=List[IngestionRunResponse])
def list_ingestion_runs(db: Session = Depends(get_db)):
    return db.query(IngestionRun).all()

@router.get("/ingestion/errors", response_model=List[IngestionErrorResponse])
def list_ingestion_errors(db: Session = Depends(get_db)):
    return db.query(IngestionError).all()

