import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.core.database import Base

class DataSource(Base):
    __tablename__ = "data_sources"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    base_url = Column(String(500), nullable=False)
    source_type = Column(String(100), default="PUBLIC_KMRL_PORTAL")
    enabled = Column(Boolean, default=True)
    last_sync = Column(DateTime, nullable=True)
    next_sync = Column(DateTime, nullable=True)
    status = Column(String(50), default="IDLE")  # IDLE, SYNCING, FAILED
    documents_found = Column(Integer, default=0)
    documents_added = Column(Integer, default=0)
    documents_updated = Column(Integer, default=0)
    documents_duplicate = Column(Integer, default=0)
    documents_failed = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    runs = relationship("IngestionRun", back_populates="source", cascade="all, delete-orphan")

class IngestionRun(Base):
    __tablename__ = "ingestion_runs"

    id = Column(Integer, primary_key=True, index=True)
    source_id = Column(Integer, ForeignKey("data_sources.id"), nullable=False, index=True)
    status = Column(String(50), default="IN_PROGRESS")  # IN_PROGRESS, COMPLETED, FAILED
    started_at = Column(DateTime, default=datetime.datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    documents_found = Column(Integer, default=0)
    documents_added = Column(Integer, default=0)
    errors_count = Column(Integer, default=0)

    source = relationship("DataSource", back_populates="runs")
    errors = relationship("IngestionError", back_populates="run", cascade="all, delete-orphan")

class IngestionError(Base):
    __tablename__ = "ingestion_errors"

    id = Column(Integer, primary_key=True, index=True)
    run_id = Column(Integer, ForeignKey("ingestion_runs.id"), nullable=False, index=True)
    source_url = Column(String(500), nullable=False)
    error_message = Column(Text, nullable=False)
    occurred_at = Column(DateTime, default=datetime.datetime.utcnow)

    run = relationship("IngestionRun", back_populates="errors")

class DocumentProvenance(Base):
    __tablename__ = "document_provenance"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(String(100), ForeignKey("documents.id"), nullable=False, index=True)
    source_type = Column(String(100), default="PUBLIC_KMRL_PORTAL")
    source_url = Column(String(500), nullable=False)
    source_domain = Column(String(200), default="kochimetro.org")
    source_title = Column(String(255), nullable=True)
    publisher = Column(String(200), default="Kochi Metro Rail Limited")
    retrieved_at = Column(DateTime, default=datetime.datetime.utcnow)
    content_hash = Column(String(100), nullable=False, index=True)
    original_file_name = Column(String(255), nullable=False)
    original_download_url = Column(String(500), nullable=False)
    collection_method = Column(String(100), default="POLITE_CRAWLER")
