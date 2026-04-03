import io
import fitz  # PyMuPDF
import docx
import pytesseract
from PIL import Image

def parse_pdf(file_bytes: bytes) -> str:
    text = ""
    try:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        for page in doc:
            text += page.get_text() + "\n"
    except Exception as e:
        raise ValueError(f"Error parsing PDF: {str(e)}")
    return text.strip()

def parse_docx(file_bytes: bytes) -> str:
    text = ""
    try:
        doc = docx.Document(io.BytesIO(file_bytes))
        for para in doc.paragraphs:
            text += para.text + "\n"
    except Exception as e:
        raise ValueError(f"Error parsing DOCX: {str(e)}")
    return text.strip()

import os

def parse_image(file_bytes: bytes) -> str:
    try:
        # If running locally on Windows, use the hardcoded path. 
        # If in Production (Linux/Render), the OS handles it natively via PATH.
        if os.name == 'nt':
            pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
        
        image = Image.open(io.BytesIO(file_bytes))
        # Use classic Tesseract OCR 
        text = pytesseract.image_to_string(image)
    except Exception as e:
        raise ValueError(f"Error parsing image with OCR. Ensure Tesseract is installed on your OS: {str(e)}")
    return text.strip()

def extract_text_from_file(file_bytes: bytes, filename: str, content_type: str) -> str:
    # Determine the file type and route to the correct parser
    ext = filename.lower().split('.')[-1]
    
    if ext == 'pdf' or content_type == 'application/pdf':
        return parse_pdf(file_bytes)
    elif ext in ['doc', 'docx'] or 'wordprocessingml.document' in content_type:
        return parse_docx(file_bytes)
    elif ext in ['png', 'jpg', 'jpeg', 'tiff', 'bmp'] or content_type.startswith('image/'):
        return parse_image(file_bytes)
    elif ext == 'txt' or content_type == 'text/plain':
        return file_bytes.decode('utf-8')
    else:
        raise ValueError("Unsupported file format. Please upload PDF, DOCX, TXT, or Images.")
