import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_workflow_recommendations_and_human_confirmation():
    # 1. Fetch AI workflow recommendations
    doc_id = "KMRL-ENG-2026-8812"
    rec_resp = client.get(f"/api/v1/documents/{doc_id}/workflow-recommendations")
    assert rec_resp.status_code == 200
    recs = rec_resp.json()
    assert len(recs) > 0
    rec_id = recs[0]["id"]
    assert recs[0]["status"] == "PENDING"

    # 2. Human Confirmation Accept AI Recommendation -> Generates Real Task
    accept_resp = client.post(
        f"/api/v1/workflow-recommendations/{rec_id}/accept",
        json={"assigned_user_id": 1, "custom_notes": "Confirmed by Muttom Lead"}
    )
    assert accept_resp.status_code == 200
    acc_data = accept_resp.json()
    assert acc_data["status"] == "ACCEPTED"
    assert "task_id" in acc_data

def test_task_operations_api():
    # Create task
    t_resp = client.post(
        "/api/v1/tasks/",
        json={"title": "Calibrate Muttom Wheel Lathe Bay-3", "priority": "High", "document_id": "KMRL-ENG-2026-8812"}
    )
    assert t_resp.status_code == 200
    task_id = t_resp.json()["id"]

    # Assign task
    assign_resp = client.post(f"/api/v1/tasks/{task_id}/assign?assigned_to_user_id=2")
    assert assign_resp.status_code == 200

    # Add comment
    cmt_resp = client.post(f"/api/v1/tasks/{task_id}/comments?text=Calibration%20verified%20by%20shift%20lead")
    assert cmt_resp.status_code == 200

    # Complete task
    comp_resp = client.post(f"/api/v1/tasks/{task_id}/complete")
    assert comp_resp.status_code == 200

def test_approvals_api():
    # Create approval
    appr_resp = client.post(
        "/api/v1/approvals/",
        json={"document_id": "KMRL-FIN-2026-3042", "comments": "BHEL Invoice Release Signoff"}
    )
    assert appr_resp.status_code == 200
    appr_id = appr_resp.json()["id"]

    # Approve request
    dec_resp = client.post(f"/api/v1/approvals/{appr_id}/approve?comments=Approved%20by%20GM")
    assert dec_resp.status_code == 200
    assert dec_resp.json()["message"].startswith("Approval decision executed: APPROVED")

def test_compliance_and_evidence():
    # Create compliance item
    comp_resp = client.post(
        "/api/v1/compliance/",
        json={"title": "CMRS Monsoon Viaduct Safety Verification", "risk_level": "High"}
    )
    assert comp_resp.status_code == 200
    comp_id = comp_resp.json()["id"]

    # Complete compliance item
    c_comp_resp = client.post(f"/api/v1/compliance/{comp_id}/complete")
    assert c_comp_resp.status_code == 200

def test_websocket_endpoint():
    with client.websocket_connect("/api/v1/ws") as websocket:
        websocket.send_text("PING")
        data = websocket.receive_json()
        assert data["event"] == "ack"
