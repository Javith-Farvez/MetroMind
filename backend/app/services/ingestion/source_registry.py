from typing import List, Dict, Any

class SourceRegistry:
    def __init__(self):
        self.sources = [
            {
                "id": 1,
                "name": "KMRL Official Portal (kochimetro.org)",
                "base_url": "https://kochimetro.org/",
                "source_type": "PUBLIC_KMRL_PORTAL",
                "categories": ["Annual Reports", "Annual Returns", "Tenders", "RTI", "Policies", "Public Notices"],
                "enabled": True
            }
        ]

    def get_all_sources((self) -> List[Dict[str, Any]]:
        return self.sources

source_registry = SourceRegistry()
