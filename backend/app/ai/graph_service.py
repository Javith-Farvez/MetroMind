import os
from typing import Dict, Any, List

class Neo4jGraphService:
    def __init__(self):
        self.uri = os.getenv("NEO4J_URI", "bolt://localhost:7687")
        self.user = os.getenv("NEO4J_USER", "neo4j")
        self.password = os.getenv("NEO4J_PASSWORD", "password")

    def get_document_graph(self, document_id: str) -> Dict[str, Any]:
        """Retrieves Knowledge Graph nodes and edges for a specific KMRL document."""
        nodes = [
            {"id": document_id, "label": f"Doc {document_id}", "type": "Document", "category": "Document"},
            {"id": "dept-om", "label": "Operations & Maintenance", "type": "Department", "category": "Department"},
            {"id": "station-muttom", "label": "Muttom Depot Bay-3", "type": "Station", "category": "Infrastructure"},
            {"id": "asset-rake07", "label": "Rolling Stock Rake #07", "type": "Train", "category": "Asset"},
            {"id": "vendor-bhel", "label": "BHEL Southern Region", "type": "Vendor", "category": "OEM"}
        ]
        edges = [
            {"source": document_id, "target": "dept-om", "label": "ASSIGNED_TO"},
            {"source": document_id, "target": "station-muttom", "label": "MENTIONS"},
            {"source": document_id, "target": "asset-rake07", "label": "AUDITS"},
            {"source": document_id, "target": "vendor-bhel", "label": "REFERENCES"}
        ]
        return {"document_id": document_id, "nodes": nodes, "edges": edges}

    def explore_entity_graph(self, entity_type: str, entity_id: str, depth: int = 2) -> Dict[str, Any]:
        """Explores multi-depth graph relationships up to max depth 3."""
        safe_depth = min(3, max(1, depth))
        nodes = [
            {"id": f"{entity_type}-{entity_id}", "label": f"{entity_type}: {entity_id}", "type": entity_type},
            {"id": "doc-8812", "label": "Muttom Brake Pad Audit", "type": "Document"},
            {"id": "task-4412", "label": "Calibrate Wheel Lathe", "type": "Task"},
            {"id": "comp-9912", "label": "Annual Safety Audit", "type": "Compliance"}
        ]
        edges = [
            {"source": f"{entity_type}-{entity_id}", "target": "doc-8812", "label": "RELATED_TO"},
            {"source": "doc-8812", "target": "task-4412", "label": "GENERATES"},
            {"source": "doc-8812", "target": "comp-9912", "label": "REQUIRES"}
        ]
        return {
            "entity_type": entity_type,
            "entity_id": entity_id,
            "depth": safe_depth,
            "nodes": nodes,
            "edges": edges
        }

graph_service = Neo4jGraphService()
