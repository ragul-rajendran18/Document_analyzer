from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.security.api_key import APIKeyHeader
from core.config import settings
from services.document_parser import extract_text_from_file
from services.llm_processor import analyze_document_content

router = APIRouter()

# Setup API Key authentication
X_API_KEY = APIKeyHeader(name="x-api-key", auto_error=True)

def verify_api_key(api_key: str = Depends(X_API_KEY)):
    if api_key != settings.API_KEY_SECRET:
         raise HTTPException(status_code=403, detail="Invalid or missing API Key")

@router.post("/document-analyze")
async def analyze_document(
    file: UploadFile = File(...),
    api_key: str = Depends(verify_api_key) 
):
    try:
        # Read the file
        file_bytes = await file.read()
        
        # Extract Text
        extracted_text = extract_text_from_file(file_bytes, file.filename, file.content_type)
        
        if not extracted_text:
            raise HTTPException(status_code=400, detail="Could not extract any text from the document.")

        # Process with LLM
        analysis_result = analyze_document_content(extracted_text)
        
        if analysis_result.get("status") == "error":
            raise HTTPException(status_code=500, detail=analysis_result.get("message", "Unknown LLM error"))
            
        return analysis_result

    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
