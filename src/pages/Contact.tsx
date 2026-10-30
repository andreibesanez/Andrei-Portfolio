import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { portfolioData } from '../data/portfolioData';
import './Contact.css';

export const Contact: React.FC = () => {
  const { personal, socials } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    // Simulate reliable dispatch
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 800);
  };

  return (
    <section id="contact" className="workspace-section">
      <div className="workspace-content-container">
        
        {/* Header */}
        <div className="section-head-row">
          <div>
            <div className="section-tag">
              <Mail size={13} />
              <span>Contact</span>
            </div>
            <h2 className="section-title">Let’s Start a Conversation</h2>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="contact-main-grid">
          
          {/* Left Column: Direct Info */}
          <div className="contact-info-col">
            <h3 className="contact-subhead">
              Available for full-stack projects, software apprenticeships, and collaborative inquiries.
            </h3>
            
            <p className="contact-desc">
              Whether you have a question regarding my projects, want to discuss web systems architecture, 
              or explore potential opportunities, my inbox is always open.
            </p>

            <div className="contact-methods-stack">
              <a href={`mailto:${personal.email}`} className="contact-method-card">
                <div className="method-icon-box">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="method-label">Direct Email</span>
                  <p className="method-value">{personal.email}</p>
                </div>
              </a>

              <div className="contact-method-card">
                <div className="method-icon-box">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="method-label">Location</span>
                  <p className="method-value">Digos City, Davao del Sur, Philippines</p>
                </div>
              </div>
            </div>

            {/* Socials Row */}
            <div className="contact-socials-row">
              <a
                href={socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-badge-btn"
              >
                <GithubIcon size={15} />
                <span>GitHub</span>
              </a>
              {socials.linkedin && (
                <a
                  href={socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-badge-btn"
                >
                  <LinkedinIcon size={15} />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="contact-form-card">
            <h4 className="form-title">Send a Direct Dispatch</h4>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Santos"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  placeholder="Project Collaboration / Opportunity"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your initiative or message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-input form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary form-submit-btn"
              >
                {status === 'sending' ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Dispatch</span>
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="form-success-banner">
                  <CheckCircle size={16} />
                  <span>Thank you! Your message has been received. I'll get back to you shortly.</span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
