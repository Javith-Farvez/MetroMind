from typing import List

class EmbeddingService:
    def generate_embedding(self, text: str) -> List[float]:
        """Generate high-dimensional vector embeddings for hybrid RAG search."""
        # Simulated 128-dimensional dense vector normalized
        hash_val = sum(ord(c) for c in text)
        return [(hash_val * i % 100) / 100.0 for i in range(128)]

embedding_service = EmbeddingService()
