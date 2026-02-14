import React from "react";
import { useNavigate } from "react-router-dom";

export default function Security() {
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
          <h1>Security</h1>
          <p>Your data security is our top priority. We implement comprehensive security measures to protect your information.</p>
          
          <div className="page-content">
            <h2>Data Encryption</h2>
            <p>All data transmitted to and from mindFetch is encrypted using industry-standard TLS/SSL protocols. Your documents are encrypted at rest using AES-256 encryption.</p>
            
            <h2>Access Controls</h2>
            <p>We implement strict access controls to ensure only authorized personnel can access infrastructure components. Multi-factor authentication is required for all administrative access.</p>
            
            <h2>Infrastructure Security</h2>
            <p>Our infrastructure is hosted on secure, SOC 2 certified cloud platforms with:</p>
            <ul>
              <li>Regular security patches and updates</li>
              <li>Network segregation and firewalls</li>
              <li>Intrusion detection and prevention systems</li>
              <li>24/7 monitoring and logging</li>
            </ul>
            
            <h2>Security Audits</h2>
            <p>We conduct regular security audits and penetration testing to identify and address vulnerabilities proactively.</p>
            
            <h2>Compliance</h2>
            <p>mindFetch adheres to industry best practices and compliance standards to protect your data.</p>
            
            <h2>Reporting Security Issues</h2>
            <p>If you discover a security vulnerability, please report it immediately to <a href="anuragp5025@gmail.com" className="contact-link">anuragp5025@gmail.com</a>. We take all reports seriously and will respond promptly.</p>
            
            <h2>Security Updates</h2>
            <p>We continuously monitor and improve our security practices to stay ahead of emerging threats.</p>
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
