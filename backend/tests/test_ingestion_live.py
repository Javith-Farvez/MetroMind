import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_sources_api_and_ingestion_sync():
    # 1. List Data Sources
    s_resp = client.get("/api/v1/sources/")
    assert s_resp.status_code == 200
    sources = s_resp.json()
    assert len(sources) > 0
    source_id = sources[0]["id"]

    # 2. Trigger KMRL Public Source Ingestion Sync
    sync_resp = client.post(f"/api/v1/sources/{source_id}/sync")
    assert sync_resp.status_code == 200
    sync_data = sync_resp.json()
    assert sync_data["message"].startswith("KMRL Public Source Synchronization Completed")
    assert "documents_added" in sync_data

    # 3. List Ingestion Runs
    runs_resp = client.get("/api/v1/sources/ingestion/runs")
    assert runs_resp.status_code == 200
    assert len(runs_resp.json()) > 0

def test_deep_health_check():
    h_resp = client.get("/api/v1/health")
    assert h_resp.status_code == 200
    h_data = h_resp.json()
    assert h_data["status"] in ["ONLINE", "DEGRADED"]
    assert "services" in h_data
    assert h_data["services"]["postgresql_database"] == "CONNECTED"
