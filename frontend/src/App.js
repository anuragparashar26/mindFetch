import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const askQuestion = async () => {
    if (!question.trim() || isAsking) return;

    try {
      setIsAsking(true);
      setStatusMessage("");
      const res = await axios.post("http://localhost:8000/ask", {
        question,
      });
      setAnswer(res.data.answer || "No answer returned.");
    } catch (error) {
      setAnswer("");
      setStatusMessage("Could not fetch answer. Please try again.");
    } finally {
      setIsAsking(false);
    }
  };

  const uploadFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file || isUploading) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      setStatusMessage("");
      await axios.post("http://localhost:8000/upload", formData);
      setStatusMessage("File uploaded successfully.");
    } catch (error) {
      setStatusMessage("File upload failed. Please retry.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="app-shell">
      <main className="app-card">
        <header className="app-header">
          <h1>Personal Knowledge Base</h1>
          <p>Upload your files and ask questions from your indexed knowledge.</p>
        </header>

        <section className="section-block">
          <h2>Upload Document</h2>
          <label className="file-input" htmlFor="kb-file-upload">
            <span>{isUploading ? "Uploading..." : "Choose a file"}</span>
            <input
              id="kb-file-upload"
              type="file"
              onChange={uploadFile}
              disabled={isUploading}
            />
          </label>
        </section>

        <section className="section-block">
          <h2>Ask a Question</h2>
          <div className="ask-row">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask something..."
              disabled={isAsking}
            />
            <button onClick={askQuestion} disabled={isAsking || !question.trim()}>
              {isAsking ? "Thinking..." : "Ask"}
            </button>
          </div>
        </section>

        {statusMessage && <p className="status-message">{statusMessage}</p>}

        <section className="section-block answer-section" aria-live="polite">
          <h2>Answer</h2>
          <p>{answer || "Your answer will appear here."}</p>
        </section>
      </main>
    </div>
  );
}

export default App;
