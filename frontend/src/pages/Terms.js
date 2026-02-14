import React from "react";
import { useNavigate } from "react-router-dom";

export default function Terms() {
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
          <h1>Terms of Service</h1>
          <p className="last-updated">Last Updated: February 14, 2026</p>
          
          <div className="page-content">
            <h2>Acceptance of Terms</h2>
            <p>By accessing and using mindFetch, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
            
            <h2>Use of Service</h2>
            <p>You agree to use mindFetch only for lawful purposes and in accordance with these Terms. You must not:</p>
            <ul>
              <li>Upload malicious or harmful content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use the service to infringe on intellectual property rights</li>
              <li>Share your account credentials with others</li>
              <li>Use automated tools to scrape or abuse our service</li>
            </ul>
            
            <h2>User Content</h2>
            <p>You retain all rights to the content you upload to mindFetch. By uploading content, you grant us a limited license to process and store your documents for the purpose of providing our service.</p>
            
            <h2>Intellectual Property</h2>
            <p>The mindFetch platform, including its design, features, and technology, is protected by copyright and other intellectual property laws. You may not copy, modify, or distribute our platform without permission.</p>
            
            <h2>Service Availability</h2>
            <p>We strive to maintain high availability but do not guarantee uninterrupted access to our service. We reserve the right to modify or discontinue features with or without notice.</p>
            
            <h2>Account Termination</h2>
            <p>We reserve the right to suspend or terminate your account if you violate these Terms or engage in abusive behavior.</p>
            
            <h2>Limitation of Liability</h2>
            <p>mindFetch is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service.</p>
            
            <h2>Changes to Terms</h2>
            <p>We may update these Terms from time to time. Continued use of the service after changes constitutes acceptance of the new Terms.</p>
            
            <h2>Contact</h2>
            <p>For questions about these Terms, contact us at anuragp5025@gmail.com</p>
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
