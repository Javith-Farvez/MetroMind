import re
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.document import Document
from app.models.document_chunk import DocumentChunk
from app.models.department import Department
from app.ai.query_intent_parser import query_intent_parser
from app.ai.embedding_provider import embedding_provider

class HybridSearchEngine:
    def search(
        self,
        db: Session,
        query: str,
        filters: Optional[Dict[str, Any]] = None,
        user_role: str = "ADMIN",
        user_department_id: Optional[int] = None,
        limit: int = 20
    ) -> Dict[str, Any]:
        """Runs multi-vector hybrid search: Keyword + Semantic Vector Chunks + Entities + Permission Authorization."""
        parsed_intent = query_intent_parser.parse_query(query)
        q_tokens = [t.lower() for t in re.findall(r'\w+', query) if len(t) > 2]
        query_vector = embedding_provider.get_embedding(query)

        # 1. Base Query with Permission Authorization Filtering
        query_db = db.query(Document)

        # RBAC Permission Filter: Non-admins restricted to their department if restricted
        if user_role not in ["ADMIN", "EXECUTIVE"] and user_department_id:
            query_db = query_db.filter(Document.department_id == user_department_id)

        # Explicit category filter from user UI controls
        user_cat = (filters or {}).get("category")
        if user_cat and user_cat != "All":
            query_db = query_db.filter(Document.document_category.ilike(f"%{user_cat}%"))

        docs = query_db.all()
        ranked_results = []
        matched_entities_set = set()
        matched_depts_set = set()

        for doc in docs:
            dept_name = doc.department.name if doc.department else "Operations & Maintenance"
            matched_depts_set.add(dept_name)

            doc_text = (doc.title + " " + (doc.description or "") + " " + (doc.document_category or "")).lower()

            # Keyword Match Score (0.0 to 1.0)
            kw_hits = sum(1 for token in q_tokens if token in doc_text)
            kw_score = min(1.0, kw_hits / (len(q_tokens) or 1))

            # Semantic Chunk Score from DocumentChunks
            chunks = db.query(DocumentChunk).filter(DocumentChunk.document_id == doc.id).all()
            best_chunk_score = 0.5
            best_snippet = doc.description[:180] if doc.description else doc.title
            best_page = 1

            for chk in chunks:
                if chk.embedding_json:
                    sim = sum(a * b for a, b in zip(query_vector, chk.embedding_json)) / (len(query_vector) or 1)
                    if sim > best_chunk_score:
                        best_chunk_score = sim
                        best_snippet = chk.text
                        best_page = chk.page_number

            # Entity Match Score
            entity_score = 0.0
            for ent in doc.entities:
                matched_entities_set.add(f"{ent.entity_type}: {ent.entity_value}")
                if ent.entity_value.lower() in query.lower():
                    entity_score += 0.4

            # Combined Hybrid Relevance Score
            hybrid_score = (0.35 * kw_score) + (0.35 * best_chunk_score) + (0.30 * min(1.0, entity_score))

            if hybrid_score > 0.10 or kw_hits > 0:
                ranked_results.append({
                    "document_id": doc.id,
                    "title": doc.title,
                    "category": doc.document_category or "General",
                    "department": dept_name,
                    "relevance_score": round(hybrid_score * 100, 1),
                    "matched_snippet": best_snippet[:220],
                    "page_number": best_page,
                    "priority": doc.priority or "Medium",
                    "language": doc.language or "English",
                    "date": doc.created_at.strftime("%Y-%m-%d") if doc.created_at else "2026-08-08",
                    "entities": [f"{e.entity_type}: {e.entity_value}" for e in doc.entities],
                    "risk_level": doc.priority or "Low",
                    "source_reference": {"page": best_page, "snippet": best_snippet[:150]}
                })

        # Sort by relevance score descending
        ranked_results.sort(key=lambda x: x["relevance_score"], reverse=True)
        final_results = ranked_results[:limit]

        # Generate intelligent suggestions if zero results
        suggested_queries = []
        if not final_results:
            suggested_queries = [
                "Try searching for 'Muttom Depot maintenance'",
                "Try searching for 'Safety inspection circulars'",
                "Try searching for 'BHEL invoice PO matching'"
            ]
        else:
            suggested_queries = [
                f"{query} in {final_results[0]['department']}",
                f"Recent {final_results[0]['category']} directives",
                f"Compliance requirements for {query}"
            ]

        # Structure related documents
        related_docs = [
            {"id": r["document_id"], "title": r["title"], "department": r["department"]}
            for r in final_results[1:4]
        ]

        return {
            "query": query,
            "intent": parsed_intent["intent"],
            "results": final_results,
            "entities": [{"name": e} for e in list(matched_entities_set)[:10]],
            "related_documents": related_docs,
            "departments": list(matched_depts_set),
            "suggested_queries": suggested_queries,
            "total": len(ranked_results)
        }

hybrid_search_engine = HybridSearchEngine()
