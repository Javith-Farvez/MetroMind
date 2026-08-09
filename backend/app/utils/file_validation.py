import os
import re
from typing import Tuple
from fastapi import HTTPException, UploadFile, status

# Allowed document formats
ALLOWED_EXTENSIONS = {
    'pdf', 'docx', 'xlsx', 'csv', 'txt', 'png', 'jpg', 'jpeg'
}

# Dangerous executable extensions to strictly reject
DISALLOWED_EXTENSIONS = {
    'exe', 'bat', 'cmd', 'sh', 'dll', 'js', 'vbs', 'ps1', 'jar', 'com', 'scr', 'py'
}

# Maximum file upload size limit (e.g. 50 MB)
MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024

def validate_uploaded_file(file: UploadFile, file_bytes: bytes) -> Tuple[str, str]:
    """Strictly validates file extension, MIME type, and size."""
    file_name = file.filename or "document.pdf"
    
    # Clean filename
    clean_name = re.sub(r'[^a-zA-Z0-9_.-]', '_', file_name)
    ext = clean_name.split('.')[-1].lower() if '.' in clean_name else ''

    if not ext or ext in DISALLOWED_EXTENSIONS or ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported or restricted file format: '.{ext}'. Allowed formats: {', '.join(sorted(ALLOWED_EXTENSIONS))}"
        )

    if len(file_bytes) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File size exceeds maximum threshold of {MAX_FILE_SIZE_BYTES / (1024 * 1024)} MB."
        )

    return clean_name, ext
