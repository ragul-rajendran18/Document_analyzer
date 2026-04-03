import json
from groq import Groq
from core.config import settings

client = Groq(api_key=settings.GROQ_API_KEY)

def analyze_document_content(text: str) -> dict:
    prompt = f"""
You are an elite Document Intelligence AI designed for enterprise analysis.
Your task is to analyze the provided document text and extract structured information with extreme precision.

Return ONLY a strictly valid JSON object matching the schema below. Do not include markdown formatting, backticks, or conversational text.

Schema strictly required:
{{
  "status": "success",
  "summary": "Provide a comprehensive, professional executive summary. Identify the physical core purpose of the document, the key subjects involved, and the most critical insights or action items derived from the text. Make it flow perfectly in an academic or business tone.",
  "entities": {{
    "names": ["list", "of", "people", "names", "or", "roles"],
    "contact_info": ["list", "of", "emails, phone numbers, addresses, or profile URLs"],
    "dates": ["list", "of", "all", "relevant", "dates"],
    "organizations": ["list", "of", "companies", "or", "institutions"],
    "amounts": ["list", "of", "monetary", "values", "with", "symbols"]
  }},
  "sentiment": "Positive | Neutral | Negative"
}}

Document Text:
{text[:4000]}
"""
    try:
        messages = [
            {"role": "system", "content": "You are a helpful and precise API that outputs ONLY strictly valid JSON."},
            {"role": "user", "content": prompt}
        ]
        model_name = "llama-3.3-70b-versatile"

        response = client.chat.completions.create(
            messages=messages,
            model=model_name,
            temperature=0.0,
        )
        
        import re
        reply = response.choices[0].message.content.strip()
        
        # Robustly extract JSON block
        json_pattern = re.search(r'\{.*\}', reply, re.DOTALL)
        if json_pattern:
            json_str = json_pattern.group(0)
            parsed_json = json.loads(json_str)
            return parsed_json
        else:
             raise ValueError("No JSON object found in response.")
             
    except Exception as e:
        return {
            "status": "error",
            "message": f"LLM Processing failed: {str(e)}"
        }
