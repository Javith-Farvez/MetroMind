import hashlib
import datetime
from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.models.source import DataSource, IngestionRun, IngestionError
from app.services.document_service import document_service
from app.services.ingestion.provenance import provenance_service

class IngestionPipeline:
    def trigger_sync(self, db: Session, source_id: int = 1) -> Dict[str, Any]:
        ds = db.query(DataSource).filter(DataSource.id == source_id).first()
        if not ds:
            ds = DataSource(
                id=source_id,
                name="KMRL Official Portal (kochimetro.org)",
                base_url="https://kochimetro.org/",
                source_type="PUBLIC_KMRL_PORTAL",
                status="SYNCING"
            )
            db.add(ds)
            db.commit()
            db.refresh(ds)

        run = IngestionRun(source_id=ds.id, status="IN_PROGRESS", started_at=datetime.datetime.utcnow())
        db.add(run)
        db.commit()
        db.refresh(run)

        # Ingest KMRL Official Public Documents
        sample_kmrl_public_docs = [
            {
                "url": "https://kochimetro.org/annual-report-2024-25.pdf",
                "filename": "KMRL_Annual_Report_2024_25.pdf",
                "title": "Kochi Metro Rail Limited Annual Financial Report 2024-25",
                "category": "Annual Reports",
                "department": "Finance & Procurement",
                "content": b"KMRL Annual Report 2024-25. Total revenue 184.2 Cr. Capital expenditure on Kakkanad Phase-2 viaduct construction."
            },
            {
                "url": "https://kochimetro.org/tenders/tender-33kv-transformer-2025.pdf",
                "filename": "KMRL_Tender_33kV_Transformer.pdf",
                "title": "KMRL Tender Notice: Supply of 33kV Dry-Type Traction Transformer",
                "category": "Tenders",
                "department": "Engineering & Infrastructure",
                "content": b"KMRL Tender Ref PO-KMRL-2025-7721 for 33kV Dry-Type Traction Transformer supply at Aluva Substation."
            }
        ]

        added_cnt = 0
        dup_cnt = 0

        for p_doc in sample_kmrl_public_docs:
            c_hash = hashlib.sha256(p_doc["content"]).hexdigest()
            existing_prov = provenance_service.get_by_hash(db, c_hash)

            if existing_prov:
                dup_cnt += 1
                continue

            # Upload & process through standard 13-stage document intelligence pipeline
            doc_rec = document_service.upload_and_process(
                db=db,
                title=p_doc["title"],
                category=p_doc["category"],
                department=p_doc["department"],
                file_name=p_doc["filename"],
                file_size=f"{round(len(p_doc['content'])/1024, 1)} KB",
                file_bytes=p_doc["content"],
                uploader_id=1
            )

            provenance_service.record_provenance(
                db=db,
                document_id=doc_rec.id,
                source_url=p_doc["url"],
                content_hash=c_hash,
                original_file_name=p_doc["filename"],
                source_title=p_doc["title"]
            )
            added_cnt += 1

        run.status = "COMPLETED"
        run.completed_at = datetime.datetime.utcnow()
        run.documents_found = len(sample_kmrl_public_docs)
        run.documents_added = added_cnt

        ds.status = "IDLE"
        ds.last_sync = datetime.datetime.utcnow()
        ds.documents_found += len(sample_kmrl_public_docs)
        ds.documents_added += added_cnt
        ds.documents_duplicate += dup_cnt

        db.commit()

        return {
            "message": "KMRL Public Source Synchronization Completed",
            "run_id": run.id,
            "documents_found": len(sample_kmrl_public_docs),
            "documents_added": added_cnt,
            "duplicates_skipped": dup_cnt
        }

ingestion_pipeline = IngestionPipeline()
