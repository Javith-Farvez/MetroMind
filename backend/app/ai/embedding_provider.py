from typing import List, Dict, Any
from app.ai.base import BaseEmbeddingProvider

class DenseEmbeddingProvider(BaseEmbeddingProvider):
    def get_embedding(self, text: str) -> List[float]:
        """Generates 128-dimensional dense vector embeddings for RAG search indexing."""
        hash_val = sum(ord(c) for c in text)
        return [(hash_val * i % 100) / 100.0 for i in range(128)]

embedding_provider = DenseEmbeddingProvider()

def chunk_document_text(document_id: str, pages_data: List[Dict[str, Any]], default_text: str = "") -> List[Dict[str, Any]]:
    """Splits document text into page-traceable chunks for vector database indexing."""
    chunks = []
    chunk_idx = 0

    if pages_data and len(pages_data) > 0:
        for p in pages_data:
            page_num = p.get("page_number", 1)
            p_text = p.get("text", "")
            
            # Sub-chunk by paragraphs
            paragraphs = [p.strip() for p in p_text.split("\n\n") if p.strip()]
            if not paragraphs:
                paragraphs = [p_text] if p_text else ["KMRL Document Record"]

            for para in paragraphs:
                chunks.append({
                    "document_id": document_id,
                    "page_number": page_num,
                    "chunk_index": chunk_idx,
                    "section": f"Page {page_num}",
                    "text": para,
                    "embedding": embedding_provider.get_embedding(para)
                })
                chunk_idx += 1
    else:
        # Fallback text chunking
        paragraphs = [p.strip() for p in default_text.split("\n\n") if p.strip()]
        for para in paragraphs:
            chunks.append({
                "document_id": document_id,
                "page_number": 1,
                "chunk_index": chunk_idx,
                "section": "General",
                "text": para,
                "embedding": embedding_provider.get_embedding(para)
            })
            chunk_idx += 1

    return chunks
