import pymupdf  # PyMuPDF
from typing import Dict, Any, List

class PDFExtractor:
    def extract(self, file_path: str) -> Dict[str, Any]:
        """Extracts text page-by-page from PDF files using PyMuPDF."""
        pages_content: List[Dict[str, Any]] = []
        full_text_lines: List[str] = []
        total_pages = 0

        try:
            doc = pymupdf.open(file_path)
            total_pages = len(doc)
            
            for page_num in range(total_pages):
                page = doc.load_page(page_num)
                text = page.get_text("text") or ""
                clean_text = text.strip()
                
                pages_content.append({
                    "page_number": page_num + 1,
                    "text": clean_text,
                    "character_count": len(clean_text)
                })
                
                if clean_text:
                    full_text_lines.append(f"--- PAGE {page_num + 1} ---\n{clean_text}")

            doc.close()
        except Exception as e:
            full_text_lines.append(f"PDF extraction error: {str(e)}")

        combined_text = "\n\n".join(full_text_lines)
        has_text = len(combined_text.strip()) > 50

        return {
            "full_text": combined_text,
            "pages": pages_content,
            "page_count": total_pages,
            "has_text": has_text,
            "requires_ocr": not has_text
        }

pdf_extractor = PDFExtractor()
