import React from "react";
import { useNavigate } from "react-router-dom";

export default function Privacy() {
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
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: February 14, 2026</p>
          
          <div className="page-content">
            <h2>Introduction</h2>
            <p>Your privacy is critically important to us. This Privacy Policy explains how mindFetch collects, uses, and protects your personal information when you use our service.</p>
            
            <h2>Information We Collect</h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul>
              <li>Documents and files you upload</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Process and analyze your documents to deliver search results</li>
            </ul>
            
            <h2>Data Sharing</h2>
            <p>We do not sell or share your personal data with third parties for marketing purposes. We may share data only when:</p>
            <ul>
              <li>Required by law or legal process</li>
              <li>Necessary to protect our rights or safety</li>
            </ul>
            
            <h2>Data Security</h2>
            <p>NOTE: YOU DATA IS TEMPORARILY STORED IN OUR SERVERS. IT GETS PERMANENTLY DELETED WHEN OUR SERVERS RESTART.</p>
            <p>We implement industry-standard security measures to protect your data, including encryption at rest and in transit, access controls, and regular security audits.</p>
            
            <h2>Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. Contact us at anuragp5025@gmail.com to exercise these rights.</p>
            
            <h2>Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through our service.</p>
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
