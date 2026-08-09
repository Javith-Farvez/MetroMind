import datetime
from sqlalchemy.orm import Session
from app.models.source import DocumentProvenance

class ProvenanceService:
    def record_provenance(
        self,
        db: Session,
        document_id: str,
        source_url: str,
        content_hash: str,
        original_file_name: str,
        source_title: str = None
    ) -> DocumentProvenance:
        prov = DocumentProvenance(
            document_id=document_id,
            source_type="PUBLIC_KMRL_PORTAL",
            source_url=source_url,
            source_domain="kochimetro.org",
            source_title=source_title or original_file_name,
            publisher="Kochi Metro Rail Limited",
            retrieved_at=datetime.datetime.utcnow(),
            content_hash=content_hash,
            original_file_name=original_file_name,
            original_download_url=source_url,
            collection_method="POLITE_CRAWLER"
        )
        db.add(prov)
        db.commit()
        db.refresh(prov)
        return prov

    def get_by_hash(self, db: Session, content_hash: str) -> DocumentProvenance:
        return db.query(DocumentProvenance).filter(DocumentProvenance.content_hash == content_hash).first()

provenance_service = ProvenanceService()
