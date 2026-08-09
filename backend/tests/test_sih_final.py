import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_multilingual_assistant_query():
    # English Query
    resp_en = client.post(
        "/api/v1/assistant/query",
        json={"query": "What safety directives apply to Aluva station?", "language": "English"}
    )
    assert resp_en.status_code == 200
    data_en = resp_en.json()
    assert "answer" in data_en
    assert "citations" in data_en

    # Malayalam Query
    resp_ml = client.post(
        "/api/v1/assistant/query",
        json={"query": "ആലുവ മെട്രോ സ്റ്റേഷന്റെ സുരക്ഷാ റിപ്പോർട്ടുകൾ", "language": "Malayalam"}
    )
    assert resp_ml.status_code == 200
    data_ml = resp_ml.json()
    assert "answer" in data_ml

    # Hindi Query
    resp_hi = client.post(
        "/api/v1/assistant/query",
        json={"query": "आलुआ स्टेशन की सुरक्षा रिपोर्ट", "language": "Hindi"}
    )
    assert resp_hi.status_code == 200
    data_hi = resp_hi.json()
    assert "answer" in data_hi

def test_meeting_intelligence_processing():
    req_data = {
        "title": "KMRL Monsoon Emergency Preparedness Review",
        "minutes_text": "Decision 1: Inspect Muttom depot wheel lathe.\nDecision 2: Verify Periyar viaduct speed limit override.\nAction Item: Replace brake pads on Rake #07 by 01:00 AM."
    }
    resp = client.post("/api/v1/meetings/process", json=req_data)
    assert resp.status_code == 200
    data = resp.json()
    assert data["title"] == req_data["title"]
    assert len(data["actions"]) > 0

def test_document_change_intelligence_and_duplicate_check():
    doc_id = "KMRL-ENG-2026-8812"

    # Change Intelligence Diff
    chg_resp = client.get(f"/api/v1/documents/{doc_id}/changes")
    assert chg_resp.status_code == 200
    chg_data = chg_resp.json()
    assert "added_count" in chg_data
    assert "potential_impacts" in chg_data

    # Duplicate Detection
    dup_resp = client.get(f"/api/v1/documents/{doc_id}/duplicate-check")
    assert dup_resp.status_code == 200
    dup_data = dup_resp.json()
    assert "status" in dup_data
