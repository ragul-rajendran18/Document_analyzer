# Use official Python image for production
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# CRITICAL for Render: Install system dependencies including Tesseract OCR
RUN apt-get update && \
    apt-get install -y tesseract-ocr libtesseract-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all application files to the container
COPY . .

# Expose the correct port
EXPOSE 8000

# Start FastAPI server tightly bound to production Host
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
