import React from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
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
          <h1>Contact Us</h1>
          <p>I'd love to hear from you! Whether you have questions, feedback, or need assistance, I am here to help.</p>
          
          <div className="page-content">
            <h2>Get in Touch</h2>
            <p>For general inquiries and support or in case you need help with your account or experiencing technical issues:</p>
            <p><strong>Email:</strong> <a href="mailto:support@mindfetch.com" className="contact-link">anuragp5025@gmail.com</a></p>
                        
            <h2>Response Time</h2>
            <p>I typically respond to all inquiries within 24-48 hours during business days.</p>
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
