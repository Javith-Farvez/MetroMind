import difflib
from typing import Dict, Any, List

class DocumentChangeAnalysisService:
    def compare_versions(self, text_v1: str, text_v2: str, title_v1: str = "v1.0", title_v2: str = "v2.0") -> Dict[str, Any]:
        lines1 = text_v1.splitlines()
        lines2 = text_v2.splitlines()

        differ = difflib.Differ()
        diff = list(differ.compare(lines1, lines2))

        added = [line[2:] for line in diff if line.startswith('+ ')]
        removed = [line[2:] for line in diff if line.startswith('- ')]
        unchanged = [line[2:] for line in diff if line.startswith('  ')]

        impacts = []
        if any("deadline" in a.lower() or "day" in a.lower() for a in added):
            impacts.append("Compliance deadline update detected.")
        if any("inspection" in a.lower() or "safety" in a.lower() for a in added):
            impacts.append("New safety inspection procedures added.")

        return {
            "version_from": title_v1,
            "version_to": title_v2,
            "added_count": len(added),
            "removed_count": len(removed),
            "added_lines": added[:10],
            "removed_lines": removed[:10],
            "affected_departments": ["Operations & Maintenance", "Safety & Quality Assurance"],
            "potential_impacts": impacts or ["Minor operational procedure update."]
        }

change_analysis_service = DocumentChangeAnalysisService()
