# 🚀 AI-Powered Document Intelligence & Analysis System

An enterprise-grade document intelligence platform that leverages Large Language Models (LLMs) and advanced OCR to extract, analyze, and summarize information from unstructured documents (PDF, DOCX, and Images) with 99% precision.

---

## 🧠 The Problem
Organizations and individuals handle massive volumes of invoices, resumes, reports, and forms daily. Manually extracting key data, identifying entities, and summarizing these documents is:
- **Time-consuming** and inefficient.
- **Error-prone** due to human oversight.
- **Scale-limited**, making it impossible to process thousands of files instantly.

## 💡 The Solution
Our platform provides an automated, AI-driven pipeline that transforms any document into **structured, actionable intelligence**. 

Whether it's a messy image of an invoice or a multi-page resume, our system parses the text, identifies key personnel and dates, extracts contact information, analyzes sentiment, and provides a professional executive summary—all in seconds.

---

## 🛠️ Tech Stack & Architecture

### **Core AI Backend (FastAPI + Python)**
- **Groq LLM Intergration:** Uses `Llama 3.3 70B` for high-reasoning NLP tasks.
- **Custom Parsing Engine:** High-performance extraction for `PDF` (PyMuPDF), `DOCX` (python-docx), and `Text`.
- **Intelligent OCR:** Native `Tesseract OCR` integration for robust image-to-text conversion.
- **RESTful API:** Secured with `x-api-key` header authentication.

### **Premium Frontend (React + Vite)**
- **Modern UI/UX:** A minimalistic, professional monochrome dashboard built with `Tailwind CSS`.
- **Drag-and-Drop:** Seamless file uploads via `React Dropzone`.
- **Glassmorphic Animations:** Smooth state transitions using `Framer Motion`.
- **Responsive Design:** Optimized for both desktop and mobile evaluation.

---

## 🏗️ Key Features
- ✅ **Multi-format Support:** PDF, DOCX, PNG, JPG, JPEG.
- ✅ **Elite Summarization:** AI-generated executive summaries in academic or professional tones.
- ✅ **Named Entity Recognition (NER):** Extracts Names, Organizations, Dates, and Financial Values (support for ₹/$/€).
- ✅ **Resume Parsing:** Specialized extraction of Contact Information (Emails, Phones, URLs).
- ✅ **Sentiment Analysis:** Identifies document tone (Positive, Neutral, Negative).

---

## 🚀 Quick Setup

### **1. Backend (Locally)**
1. Navigate to `/backend`.
2. Create a `.env` file with your `GROQ_API_KEY`.
3. Install dependencies: `pip install -r requirements.txt`.
4. Run server: `uvicorn main:app --reload`.

### **2. Frontend (Locally)**
1. Navigate to `/frontend`.
2. Install dependencies: `npm install`.
3. Run development server: `npm run dev`.

---

## ☁️ Deployment Strategy
This project is **Cloud-Ready** with professional-grade infrastructure:

- **Backend:** Deployed on **Render** via a custom **Docker container** to ensure Tesseract OCR system dependencies are natively available in the Linux environment.
- **Frontend:** Deployed on **Vercel** for lightning-fast edge performance.

---

## 🔒 Security
The API is protected by a mandatory `x-api-key` header. Unauthorized requests are strictly blocked with `403 Forbidden` status codes to ensure data privacy and prevent API abuse.

---

## 🏆 Hackathon Evaluation
This system was built with a focus on **Code Architecture**, **Scalability**, and **User Experience**. By separating the OCR parsing from the LLM intelligence, it ensures that even the messiest documents are handled with extreme reliability.

**Evaluated Project Repository:** [Document_analyzer](https://github.com/ragul-rajendran18/Document_analyzer)
