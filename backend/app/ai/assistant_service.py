from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.document import Document
from app.ai.hybrid_search_engine import hybrid_search_engine
from app.schemas.assistant import AssistantQueryRequest, AssistantQueryResponse, SourceCitation

class AssistantService:
    def answer_query(self, db: Session, req: AssistantQueryRequest, user_role: str = "ADMIN", user_dept_id: int = None) -> AssistantQueryResponse:
        # Run hybrid search with permission filtering
        search_res = hybrid_search_engine.search(
            db=db,
            query=req.query,
            user_role=user_role,
            user_department_id=user_dept_id,
            limit=5
        )

        results = search_res.get("results", [])
        citations = []

        if not results:
            answer = f"No authorized KMRL documents were found directly addressing '{req.query}'."
            if req.language and "Malayalam" in req.language:
                answer = f"'{req.query}' സംബന്ധിച്ച ഔദ്യോഗിക KMRL രേഖകൾ ലഭ്യമല്ല."
            elif req.language and "Hindi" in req.language:
                answer = f"'{req.query}' से संबंधित कोई अधिकृत केएमआरएल दस्तावेज नहीं मिला।"
            return AssistantQueryResponse(
                query=req.query,
                answer=answer,
                language=req.language or "English",
                confidence=70.0,
                citations=[],
                suggested_followups=["Try searching for Aluva station safety directives", "Check Muttom depot rolling stock guidelines"]
            )

        # Synthesize RAG Answer based on top document
        top_doc = results[0]
        for r in results:
            citations.append(SourceCitation(
                document_id=str(r["document_id"]),
                document_title=r["title"],
                page_number=r.get("page_number", 1),
                snippet=r["matched_snippet"],
                confidence=r["relevance_score"]
            ))

        if req.language and "Malayalam" in req.language:
            answer = f"KMRL ഔദ്യോഗിക രേഖകൾ പ്രകാരം ({top_doc['title']}): {top_doc['matched_snippet']} [ഉറവിടം: പേജ് {top_doc.get('page_number', 1)}]"
        elif req.language and "Hindi" in req.language:
            answer = f"केएमआरएल के अधिकृत दस्तावेजों के अनुसार ({top_doc['title']}): {top_doc['matched_snippet']} [स्रोत: पृष्ठ {top_doc.get('page_number', 1)}]"
        else:
            answer = f"According to authorized KMRL document '{top_doc['title']}': {top_doc['matched_snippet']} (Source: Page {top_doc.get('page_number', 1)})."

        return AssistantQueryResponse(
            query=req.query,
            answer=answer,
            language=req.language or "English",
            confidence=top_doc["relevance_score"],
            citations=citations,
            suggested_followups=[
                f"What are the compliance requirements for {top_doc['title']}?",
                f"Show related maintenance schedules in {top_doc['department']}",
                "Who is the assigned owner for this operational directive?"
            ]
        )

assistant_service = AssistantService()
