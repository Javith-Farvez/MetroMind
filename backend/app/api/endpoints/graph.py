from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(prefix="/graph", tags=["KMRL Knowledge Graph Engine"])

@router.get("/nodes")
async def get_nodes():
    """Retrieve all KMRL entity nodes (Stations, Assets, Trains, Vendors, Documents)."""
    return [
        {"id": "node-muttom", "label": "Muttom Depot & OCC", "type": "station", "category": "Infrastructure"},
        {"id": "node-rake07", "label": "Rake #07 (KM-07)", "type": "asset", "category": "Rolling Stock"},
        {"id": "node-alstom", "label": "Alstom Transport India", "type": "vendor", "category": "OEM"},
        {"id": "node-bhel", "label": "BHEL Southern Region", "type": "vendor", "category": "OEM"},
        {"id": "node-doc-8812", "label": "Doc KMRL-ENG-8812", "type": "document", "category": "Audit Report"}
    ]

@router.get("/edges")
async def get_edges():
    """Retrieve all entity relationships and links."""
    return [
        {"source": "node-muttom", "target": "node-rake07", "label": "Housed At"},
        {"source": "node-alstom", "target": "node-rake07", "label": "OEM Supplier"},
        {"source": "node-rake07", "target": "node-doc-8812", "label": "Audit Target"},
        {"source": "node-bhel", "target": "node-doc-3042", "label": "Billed In"}
    ]
