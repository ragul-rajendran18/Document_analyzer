import { useState, useCallback } from 'react'
import { UploadCloud, FileText, CheckCircle, AlertCircle, Loader2, DollarSign, Calendar, Building, User, Mail } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'

function App() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [showApp, setShowApp] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
      setError(null)
      setResult(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1
  })

  const handleProcess = async () => {
    if (!file) return

    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('https://document-analyzer-k4jg.onrender.com/api/document-analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-api-key': 'your_secret_api_key_for_clients' 
        }
      })
      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'An error occurred during processing.')
    } finally {
      setLoading(false)
    }
  }

  if (!showApp) {
    return (
      <div className="min-h-screen bg-gray-50/50 dark:bg-neutral-950 flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 to-gray-50 dark:from-neutral-900 dark:to-neutral-950">
        <div className="max-w-3xl text-center space-y-8 animate-in fade-in zoom-in-95 duration-700">
          <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 mb-2">
            <FileText className="w-12 h-12 text-gray-900 dark:text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
            Enterprise Document Intelligence
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Instantly transform unstructured PDFs, DOCX files, and images into perfectly structured JSON data. Powered by Llama 3 Vision and advanced OCR technology.
          </p>
          <div className="pt-8">
            <button
              onClick={() => setShowApp(true)}
              className="px-8 py-4 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-semibold rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
            >
              Try Document Analyzer Now
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-neutral-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header - Minimal and professional */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Document Extraction
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Upload unstructured documents to extract structured insights and entities.
            </p>
          </div>
          <button 
            onClick={() => setShowApp(false)}
            className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Back to Home
          </button>
        </div>

        <div className="grid md:grid-cols-12 gap-6 items-start">
          
          {/* Upload Section */}
          <div className="md:col-span-5 w-full">
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-5 space-y-5 shadow-sm">
              <h2 className="text-sm font-medium text-gray-900 dark:text-neutral-100">Upload Source</h2>
              
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center min-h-[160px]
                  ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300 dark:border-neutral-800 dark:hover:border-neutral-700'}
                  ${file ? 'border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900/50' : ''}
                `}
              >
                <input {...getInputProps()} />
                  {file ? (
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-500" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-sm text-gray-900 dark:text-neutral-200 truncate max-w-[200px]">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded border border-gray-200 dark:border-neutral-800 flex items-center justify-center mx-auto bg-white dark:bg-neutral-950">
                        <UploadCloud className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-sm text-gray-700 dark:text-neutral-300">Click or drag a file</p>
                        <p className="text-xs text-gray-500">Supported: PDF, DOCX, PNG, JPG</p>
                      </div>
                    </div>
                  )}
              </div>

              <button
                onClick={handleProcess}
                disabled={!file || loading}
                className="w-full relative py-2.5 px-4 bg-gray-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 dark:hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Extracting Data..." : "Run Extraction"}
              </button>
              
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg flex items-start gap-2.5 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="leading-snug">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="md:col-span-7">
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6 min-h-[400px] shadow-sm">
              {!result && !loading && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-60 min-h-[300px]">
                  <FileText className="w-8 h-8 text-gray-400" />
                  <p className="text-gray-500 text-sm max-w-[250px]">
                    Extracted logic and analysis will populate here.
                  </p>
                </div>
              )}
              
              {loading && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
                  <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Processing document securely...</p>
                </div>
              )}

              {result && !loading && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-neutral-800 pb-4">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-neutral-100">Review Output</h2>
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-md border
                      ${result.sentiment === 'Positive' ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/50" :
                      result.sentiment === 'Negative' ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50" : 
                      "bg-gray-100 text-gray-700 border-gray-200 dark:bg-neutral-800 dark:text-gray-400 dark:border-neutral-700"}`}
                    >
                      {result.sentiment}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Document Summary</h3>
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-neutral-950/50 border border-gray-100 dark:border-neutral-800/80 leading-relaxed text-sm text-gray-700 dark:text-neutral-300 whitespace-pre-wrap">
                      {result.summary || "No summary generated."}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Structured Entities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      {/* People Container */}
                      <div className="p-3 border border-gray-200 dark:border-neutral-800 rounded-lg space-y-2 bg-white dark:bg-neutral-900">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                          <User className="w-3.5 h-3.5" /> Personnel
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {result.entities?.names?.length > 0 ? 
                            result.entities.names.map((n, i) => <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-neutral-200 border border-gray-200 dark:border-neutral-700">{n}</span>) : 
                            <span className="text-xs text-gray-400">None detected</span>}
                        </div>
                      </div>

                      {/* Orgs Container */}
                      <div className="p-3 border border-gray-200 dark:border-neutral-800 rounded-lg space-y-2 bg-white dark:bg-neutral-900">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                          <Building className="w-3.5 h-3.5" /> Organizations
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {result.entities?.organizations?.length > 0 ? 
                            result.entities.organizations.map((n, i) => <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-neutral-200 border border-gray-200 dark:border-neutral-700">{n}</span>) : 
                            <span className="text-xs text-gray-400">None detected</span>}
                        </div>
                      </div>

                      {/* Dates Container */}
                      <div className="p-3 border border-gray-200 dark:border-neutral-800 rounded-lg space-y-2 bg-white dark:bg-neutral-900">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                          <Calendar className="w-3.5 h-3.5" /> Key Dates
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {result.entities?.dates?.length > 0 ? 
                            result.entities.dates.map((n, i) => <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-neutral-200 border border-gray-200 dark:border-neutral-700">{n}</span>) : 
                            <span className="text-xs text-gray-400">None detected</span>}
                        </div>
                      </div>

                      {/* Amounts Container */}
                      <div className="p-3 border border-gray-200 dark:border-neutral-800 rounded-lg space-y-2 bg-white dark:bg-neutral-900">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                          <DollarSign className="w-3.5 h-3.5" /> Financials
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {result.entities?.amounts?.length > 0 ? 
                            result.entities.amounts.map((n, i) => <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-neutral-200 border border-gray-200 dark:border-neutral-700">{n}</span>) : 
                            <span className="text-xs text-gray-400">None detected</span>}
                        </div>
                      </div>

                      {/* Contact Info Container */}
                      <div className="p-3 border border-gray-200 dark:border-neutral-800 rounded-lg space-y-2 bg-white dark:bg-neutral-900 md:col-span-2">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                          <Mail className="w-3.5 h-3.5" /> Contact Information
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {result.entities?.contact_info?.length > 0 ? 
                            result.entities.contact_info.map((n, i) => <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-neutral-200 border border-gray-200 dark:border-neutral-700">{n}</span>) : 
                            <span className="text-xs text-gray-400">No contact details found</span>}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
