import pytest
import io
from fastapi.testclient import TestClient
from main import app
from app.utils.file_validation import validate_uploaded_file, ALLOWED_EXTENSIONS
from app.ai.extractors.pdf_extractor import pdf_extractor
from app.ai.extractors.docx_extractor import docx_extractor
from app.ai.extractors.xlsx_extractor import xlsx_extractor
from app.ai.extractors.image_ocr_extractor import image_ocr_extractor
from app.ai.classifier import document_classifier
from app.ai.entity_extractor import entity_extractor

client = TestClient(app)

def test_file_validation_rules():
    # Valid PDF file mock
    from fastapi import UploadFile
    valid_file = UploadFile(filename="circular.pdf", file=io.BytesIO(b"%PDF-1.4 test content"))
    clean_name, ext = validate_uploaded_file(valid_file, b"%PDF-1.4 test content")
    assert ext == "pdf"
    assert clean_name == "circular.pdf"

    # Disallowed EXE file mock
    invalid_file = UploadFile(filename="malicious.exe", file=io.BytesIO(b"binary data"))
    with pytest.raises(Exception):
        validate_uploaded_file(invalid_file, b"binary data")

def test_ai_extractors_and_classifier():
    cls_res = document_classifier.classify("Bogie Maintenance Report", "Replacement of wheel lathe pads at Muttom Depot Bay-3.")
    assert cls_res["category"] in ["MAINTENANCE", "ENGINEERING"]

    ent_res = entity_extractor.extract("KMRL Purchase Order PO-9912 to BHEL for ₹16.43 Crore.", "order.pdf")
    assert len(ent_res) > 0

def test_document_upload_and_status_api():
    file_bytes = b"%PDF-1.4 KMRL Rolling Stock Safety Maintenance Guidelines 2026"
    response = client.post(
        "/api/v1/documents/upload",
        data={"title": "KMRL Rolling Stock Safety Guidelines", "category": "SAFETY", "department": "Operations & Maintenance"},
        files={"file": ("safety_guide.pdf", file_bytes, "application/pdf")}
    )
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    doc_id = data["id"]
    assert data["title"] == "KMRL Rolling Stock Safety Guidelines"

    # Test Processing Status API
    status_resp = client.get(f"/api/v1/documents/{doc_id}/processing-status")
    assert status_resp.status_code == 200
    assert status_resp.json()["status"] == "COMPLETED"

    # Test Document Details API
    details_resp = client.get(f"/api/v1/documents/{doc_id}")
    assert details_resp.status_code == 200
    assert details_resp.json()["document"]["id"] == doc_id
