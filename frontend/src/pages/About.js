import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="app-wrapper">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <img src={process.env.PUBLIC_URL + "/icons/black.png"} alt="logo" className="logo-icon" />
            <span className="logo-text">mindFetch</span>
          </div>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/#features">Features</a>
            <button className="nav-cta" onClick={() => navigate("/workspace")}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="page-section">
        <div className="page-container">
          <h1>About mindFetch</h1>
          <p>mindFetch is your personal knowledge base powered by cutting-edge AI technology. We help you unlock the full potential of your documents by providing instant, intelligent answers to your questions.</p>
          
          <div className="page-content">
            <h2>Our Mission</h2>
            <p>We believe that access to information should be instant and effortless. Our mission is to transform the way people interact with their documents by leveraging the power of AI to deliver accurate, contextual answers in seconds.</p>
            
            <h2>How It Works</h2>
            <p>mindFetch uses advanced natural language processing and vector search technology to understand your questions and find the most relevant information across all your uploaded documents. Our AI-powered system analyzes context and semantics to provide you with precise answers.</p>
            
            <h2>Why Choose Us</h2>
            <p>Built with privacy and security at its core, mindFetch ensures your data remains protected while delivering lightning-fast search results. Whether you're a student, professional, or researcher, mindFetch helps you work smarter and faster.</p>
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
              <h4>Company</h4>
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
