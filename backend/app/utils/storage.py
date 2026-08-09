import os
import datetime
from typing import Tuple

class StorageService:
    def __init__(self, base_dir: str = "storage"):
        self.base_dir = base_dir

    def save_file(self, document_id: str, file_name: str, file_bytes: bytes) -> str:
        """Saves file into hierarchical storage: storage/documents/YYYY/MM/{document_id}/{filename}"""
        now = datetime.datetime.utcnow()
        year_str = now.strftime("%Y")
        month_str = now.strftime("%m")

        rel_path = os.path.join("documents", year_str, month_str, document_id)
        target_dir = os.path.join(self.base_dir, rel_path)
        os.makedirs(target_dir, exist_ok=True)

        full_path = os.path.join(target_dir, file_name)
        with open(full_path, "wb") as f:
            f.write(file_bytes)

        return full_path

storage_service = StorageService()
