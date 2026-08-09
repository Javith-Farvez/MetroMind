import pytest
from fastapi.testclient import TestClient
from main import app
from app.ai.query_intent_parser import query_intent_parser

client = TestClient(app)

def test_query_intent_parser():
    p1 = query_intent_parser.parse_query("Show all safety incidents related to Aluva station")
    assert p1["intent"] == "SAFETY_SEARCH"
    assert "Aluva" in p1["extracted_stations"]

    p2 = query_intent_parser.parse_query("BHEL invoices above 10 lakh")
    assert p2["intent"] == "FINANCE_SEARCH"
    assert p2["min_amount"] == 1000000.0

    p3 = query_intent_parser.parse_query("സുരക്ഷാ റിപ്പോർട്ടുകൾ")
    assert p3["is_malayalam"] is True

def test_hybrid_search_api():
    response = client.post(
        "/api/v1/search/",
        json={"query": "Muttom depot rolling stock brake pad inspection", "page": 1, "page_size": 10}
    )
    assert response.status_code == 200
    data = response.json()
    assert "intent" in data
    assert "results" in data
    assert len(data["results"]) > 0
    assert data["results"][0]["page_number"] >= 1
    assert "source_reference" in data["results"][0]

def test_saved_search_and_history():
    # Save search
    save_resp = client.post(
        "/api/v1/search/saved",
        json={"name": "Muttom Brake Safety Audit", "query": "Muttom brake pad", "filters": {"category": "MAINTENANCE"}}
    )
    assert save_resp.status_code == 200
    saved = save_resp.json()
    assert saved["name"] == "Muttom Brake Safety Audit"

    # List saved searches
    list_resp = client.get("/api/v1/search/saved")
    assert list_resp.status_code == 200
    assert len(list_resp.json()) > 0

    # Delete saved search
    del_resp = client.delete(f"/api/v1/search/saved/{saved['id']}")
    assert del_resp.status_code == 200

def test_knowledge_graph_and_similar_docs():
    # Document Graph
    graph_resp = client.get("/api/v1/knowledge/documents/KMRL-ENG-2026-8812")
    assert graph_resp.status_code == 200
    g_data = graph_resp.json()
    assert "nodes" in g_data
    assert "edges" in g_data

    # Similar Documents
    sim_resp = client.get("/api/v1/documents/KMRL-ENG-2026-8812/similar")
    assert sim_resp.status_code == 200
    sim_data = sim_resp.json()
    assert len(sim_data) > 0
    assert "relationship_explanation" in sim_data[0]
