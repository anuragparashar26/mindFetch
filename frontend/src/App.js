import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Security from "./pages/Security";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/workspace" element={<WorkspacePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/security" element={<Security />} />
      </Routes>
    </BrowserRouter>
  );
}

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="app-wrapper">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src={process.env.PUBLIC_URL + "/icons/black.png"} alt="logo" className="logo-icon" />
            <span className="logo-text">mindFetch</span>
          </div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <button className="nav-cta" onClick={() => navigate("/workspace")}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="hero-section" id="home">
        <div className="hero-content">
          <span className="hero-badge">Your Personal Knowledge Base</span>
          <h1>Turn Your Documents Into Instant Answers</h1>
          <p>
            Upload your files and ask questions with an elegant workflow for intelligent document search and high-quality answers.
          </p>
          <button type="button" className="hero-cta" onClick={() => navigate("/workspace")}>
            Let's Go
          </button>
          <div className="free-forever-msg">
            <span><strong>Completely free</strong>, no credit card or sign up required.</span>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="features-container">
          <h2>Why Choose mindFetch</h2>
          <div className="features-grid">
            <div className="feature-card">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3>Lightning Fast</h3>
              <p>Get instant answers from your documents in seconds</p>
            </div>
            <div className="feature-card">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <h3>Secure & Private</h3>
              <p>Your data is processed securely and privately</p>
            </div>
            <div className="feature-card">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <h3>Accurate Results</h3>
              <p>AI-powered answers with high accuracy and context</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={process.env.PUBLIC_URL + "/icons/white.png"} alt="logo" className="logo-icon" />
              <span className="logo-text">mindFetch</span>
            </div>
            <p>Search your documents instantly with AI-powered answers.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
              <a href="/security">Security</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 mindFetch. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function WorkspacePage() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("info");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");

  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("kb-conversation-history");
    if (saved) {
      try {
        setConversationHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load conversation history", e);
      }
    }
  }, []);

  useEffect(() => {
    if (conversationHistory.length > 0) {
      localStorage.setItem("kb-conversation-history", JSON.stringify(conversationHistory));
    }
  }, [conversationHistory]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationHistory]);

  const askQuestion = async () => {
    if (!question.trim() || isAsking) return;

    const userQuestion = question;
    setQuestion("");
    setCurrentQuestion(userQuestion);

    try {
      setIsAsking(true);
      setStatusMessage("");
      setStatusType("info");
      
      const res = await axios.post("https://indexmind.onrender.com/ask", {
        question: userQuestion,
      });
      
      const aiAnswer = res.data.answer || "No answer returned.";
      
      const newEntry = {
        id: Date.now(),
        question: userQuestion,
        answer: aiAnswer,
        timestamp: new Date().toISOString(),
      };
      
      setConversationHistory(prev => [...prev, newEntry]);
    } catch (error) {
      setStatusType("error");
      setStatusMessage("Could not fetch answer. Please try again.");
      
      const errorEntry = {
        id: Date.now(),
        question: userQuestion,
        answer: "Sorry, I couldn't process your question. Please try again.",
        timestamp: new Date().toISOString(),
        isError: true,
      };
      
      setConversationHistory(prev => [...prev, errorEntry]);
    } finally {
      setIsAsking(false);
    }
  };

  const clearConversation = () => {
    setShowClearModal(true);
  };

  const confirmClear = () => {
    setConversationHistory([]);
    localStorage.removeItem("kb-conversation-history");
    setStatusMessage("Conversation cleared");
    setStatusType("info");
    setShowClearModal(false);
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const exportConversation = () => {
    if (conversationHistory.length === 0) {
      setStatusMessage("No conversation to export");
      setStatusType("info");
      setTimeout(() => setStatusMessage(""), 3000);
      return;
    }
    setShowExportModal(true);
  };

  const confirmExport = () => {
    const exportData = conversationHistory.map((entry, index) => {
      return `\n--- Message ${index + 1} ---\nTime: ${new Date(entry.timestamp).toLocaleString()}\n\nQuestion: ${entry.question}\n\nAnswer: ${entry.answer}\n`;
    }).join("\n" + "=".repeat(50));

    const blob = new Blob([exportData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `conversation-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportModal(false);
    setStatusMessage("Conversation exported successfully");
    setStatusType("success");
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const uploadFile = async (file) => {
    if (!file || isUploading) return;

    setSelectedFileName(file.name);
    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      setUploadProgress(0);
      setStatusMessage("");
      setStatusType("info");
      await axios.post("https://indexmind.onrender.com/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total || file.size;
          const nextProgress = total ? Math.round((progressEvent.loaded / total) * 100) : 0;
          setUploadProgress(nextProgress);
        },
      });
      setUploadProgress(100);
      setStatusType("success");
      setStatusMessage("File uploaded successfully.");
    } catch (error) {
      setStatusType("error");
      setStatusMessage("File upload failed. Please retry.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    uploadFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isUploading) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (isUploading) return;
    const file = e.dataTransfer.files?.[0];
    uploadFile(file);
  };

  return (
    <div className="workspace-page">
      <nav className="navbar workspace-nav">
        <div className="nav-container">
          <div className="nav-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <img src={process.env.PUBLIC_URL + "/icons/black.png"} alt="logo" className="logo-icon" />
            <span className="logo-text">mindFetch</span>
          </div>
          <div className="workspace-actions">
            <button className="action-btn" onClick={clearConversation} title="Clear conversation">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              New Chat
            </button>
            <button className="action-btn" onClick={exportConversation} title="Export conversation">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Export
            </button>
          </div>
        </div>
      </nav>

      {/* Clear Conversation Modal */}
      {showClearModal && (
        <div className="modal-overlay" onClick={() => setShowClearModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Clear Conversation</h3>
              <button className="modal-close" onClick={() => setShowClearModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to clear all conversation history? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowClearModal(false)}>Cancel</button>
              <button className="btn-danger" onClick={confirmClear}>Clear</button>
            </div>
          </div>
        </div>
      )}

      {/* Export Conversation Modal */}
      {showExportModal && (
        <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Export Conversation</h3>
              <button className="modal-close" onClick={() => setShowExportModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <p>Export your conversation history as a text file?</p>
              <div className="export-info">
                <div className="info-item">
                  <span className="info-label">Messages:</span>
                  <span className="info-value">{conversationHistory.length}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Format:</span>
                  <span className="info-value">Plain Text (.txt)</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowExportModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={confirmExport}>Export</button>
            </div>
          </div>
        </div>
      )}

      <div className="workspace-layout">
        <main className="workspace-main">
          <div className="conversation-container">
            {conversationHistory.length === 0 ? (
              <div className="empty-state">
                <svg className="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3>Start a Conversation</h3>
                <p>Upload a document and ask your first question to get started.</p>
                
                <label
                  className={`upload-dropzone ${isDragActive ? "drag-active" : ""} ${
                    isUploading ? "uploading" : ""
                  }`}
                  htmlFor="kb-file-upload"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  tabIndex={0}
                >
                  <span className="upload-title">
                    {isUploading ? "Uploading document..." : "Drag and drop file here"}
                  </span>
                  <span className="upload-subtitle">
                    {isUploading ? "Upload in progress" : "or click to browse from your device"}
                  </span>
                  {selectedFileName && <span className="selected-file">{selectedFileName}</span>}

                  {(isUploading || uploadProgress > 0) && (
                    <span className="progress-track" aria-hidden="true">
                      <span className="progress-bar" style={{ width: `${uploadProgress}%` }} />
                    </span>
                  )}
                  <span className="progress-label">
                    {isUploading
                      ? `${uploadProgress}% complete`
                      : uploadProgress === 100
                        ? "Upload complete"
                        : ""}
                  </span>

                  <input
                    ref={fileInputRef}
                    id="kb-file-upload"
                    type="file"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </label>
              </div>
            ) : (
              <div className="conversation-history">
                {conversationHistory.map((entry) => (
                  <div key={entry.id} className="conversation-entry">
                    <div className="message user-message">
                      <div className="message-avatar">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="message-content">
                        <div className="message-header">
                          <span className="message-sender">You</span>
                          <span className="message-time">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <p>{entry.question}</p>
                      </div>
                    </div>
                    <div className={`message ai-message ${entry.isError ? "error-message" : ""}`}>
                      <div className="message-avatar">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M9 12h.01M15 12h.01M9 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="message-content">
                        <div className="message-header">
                          <span className="message-sender">AI Assistant</span>
                          <span className="message-time">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="markdown-content">
                          <ReactMarkdown components={{
                            p: ({children}) => <>{children}<br /><br /></>
                          }}>{entry.answer}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isAsking && (
                  <div className="conversation-entry">
                    <div className="message user-message">
                      <div className="message-avatar">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="message-content">
                        <div className="message-header">
                          <span className="message-sender">You</span>
                        </div>
                        <p>{currentQuestion}</p>
                      </div>
                    </div>
                    <div className="message ai-message loading-message">
                      <div className="message-avatar">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M9 12h.01M15 12h.01M9 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="message-content">
                        <div className="message-header">
                          <span className="message-sender">AI Assistant</span>
                        </div>
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <input
                type="text"
                className="chat-input"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question about your documents..."
                disabled={isAsking}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    askQuestion();
                  }
                }}
              />
              <button className="send-btn" onClick={askQuestion} disabled={isAsking || !question.trim()}>
                {isAsking ? (
                  <svg className="spinner-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </main>
      </div>

      {statusMessage && (
        <div className={`status-message ${statusType}`} role="status" aria-live="polite">
          {statusMessage}
        </div>
      )}
    </div>
  );
}

export default App;
