from sqlalchemy import Column, Integer, String, Text, JSON, ForeignKey
from app.core.database import Base

class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(String(100), ForeignKey("documents.id"), nullable=False, index=True)
    page_number = Column(Integer, default=1, index=True)
    chunk_index = Column(Integer, default=0)
    section = Column(String(100), nullable=True)
    text = Column(Text, nullable=False)
    embedding_json = Column(JSON, nullable=True)
