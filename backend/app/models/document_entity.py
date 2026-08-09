from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class DocumentEntity(Base):
    __tablename__ = "document_entities"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(String(100), ForeignKey("documents.id"), nullable=False, index=True)
    entity_type = Column(String(100), nullable=False)
    entity_name = Column(String(150), nullable=False)
    entity_value = Column(String(255), nullable=False)
    confidence = Column(Float, default=98.5)

    document = relationship("Document", back_populates="entities")
