import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Compass
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon } from '../components/SocialIcons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';
import { InteractiveMap } from '../components/Map';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { personal, socials } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%'
        }
      });

      tl.from('.obs-section-header', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, 0);

      tl.from('.obs-dispatch-form-card', {
        x: -90,
        scale: 0.95,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out'
      }, 0.15);

      tl.from('.obs-contact-info-col', {
        x: 90,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      }, 0.2);

      tl.from('.obs-channel-item', {
        x: 25,
        opacity: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power2.out'
      }, 0.35);

      tl.from('.obs-map-container-card', {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.4)'
      }, 0.45);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    // 1. Required fields check
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please complete all required fields of the dispatch manuscript.'
      });
      setIsSubmitting(false);
      return;
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid electronic mail address (e.g., name@domain.com).'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

      if (!accessKey) {
        // Honest mailto fallback with clipboard copy
        const bodyText = `Sender: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
        try {
          await navigator.clipboard.writeText(bodyText);
        } catch {}

        const mailtoUri = `mailto:${personal.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(bodyText)}`;
        window.location.href = mailtoUri;

        setStatus({
          type: 'success',
          message: 'Opening your default mail client to dispatch your message. Manuscript text has also been copied to your clipboard!'
        });
        setIsSubmitting(false);
        return;
      }

      // Live Web3Forms submission if configured
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Classical Observatory Dispatch'
        })
      });

      const data = await res.json();

      if (data.success) {
        setStatus({
          type: 'success',
          message: 'Your dispatch has been successfully transmitted. I shall review your correspondence and reply promptly.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Transmission encountered an obstacle. Kindly reach out directly via andreibesanez20@gmail.com.'
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Transmission network interruption. Please send your dispatch directly to andreibesanez20@gmail.com.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={containerRef} className="obs-contact-chamber">
      <div className="obs-section-header">
        <div className="obs-catalog-tag">
          <Compass size={13} color="var(--brass)" />
          <span>Section VI • The Dispatch</span>
        </div>
        <h2 className="obs-section-title">Scholarly Correspondence</h2>
        <p className="obs-section-subtitle">
          Have an inquiry, collaborative proposal, or technical initiative? Transmit a manuscript directly to my observatory station.
        </p>
      </div>

      <div className="obs-contact-layout-grid">
        {/* Left Column: Dispatch Form Card */}
        <div className="obs-dispatch-form-card">
          <div className="obs-card-bracket-tl" />
          <div className="obs-card-bracket-tr" />
          <div className="obs-card-bracket-bl" />
          <div className="obs-card-bracket-br" />

          <div className="obs-form-card-header">
            <h3 className="obs-form-title">Transmit Manuscript</h3>
            <span className="obs-form-subtitle">Formal correspondence to Andrei Besañez</span>
          </div>

          {status.message && (
            <div
              className={`obs-status-banner ${status.type}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.85rem 1rem',
                borderRadius: '6px',
                marginBottom: '1.25rem',
                fontSize: '0.875rem',
                backgroundColor: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: `1px solid ${status.type === 'success' ? '#10b981' : '#ef4444'}`,
                color: status.type === 'success' ? '#10b981' : '#ef4444'
              }}
            >
              {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="obs-dispatch-form" noValidate>
            <div className="obs-form-row">
              <div className="obs-form-group">
                <label className="obs-input-label">Scholar / Inquirer Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  className="obs-text-input"
                  required
                />
              </div>

              <div className="obs-form-group">
                <label className="obs-input-label">Electronic Mail Coordinate *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@domain.com"
                  className="obs-text-input"
                  required
                />
              </div>
            </div>

            <div className="obs-form-group">
              <label className="obs-input-label">Subject of Inquiry *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Regarding Web Development / Academic Capstone"
                className="obs-text-input"
                required
              />
            </div>

            <div className="obs-form-group">
              <label className="obs-input-label">Manuscript Content *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message, project specifications, or collaboration thoughts here..."
                className="obs-textarea"
                rows={5}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-brass-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              <span>{isSubmitting ? 'Transmitting Dispatch...' : 'Transmit Dispatch'}</span>
              <Send size={15} />
            </button>
          </form>
        </div>

        {/* Right Column: Official Channels & Geographic Cartography */}
        <div className="obs-contact-info-col">
          <div className="obs-channel-card">
            <div className="obs-card-bracket-tl" />
            <div className="obs-card-bracket-tr" />
            <div className="obs-card-bracket-bl" />
            <div className="obs-card-bracket-br" />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--ink)' }}>
                Verified Communication Lines
              </h4>
              <button
                onClick={copyEmailToClipboard}
                className="obs-copy-email-btn"
                title="Copy email to clipboard"
                aria-label="Copy Andrei Besañez email address"
              >
                {copiedEmail ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>

            <div className="obs-channels-list">
              <div className="obs-channel-item">
                <div className="obs-channel-icon-wrap">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="obs-channel-label">Direct Electronic Mail</div>
                  <a href={`mailto:${personal.email}`} className="obs-channel-val" style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    {personal.email}
                  </a>
                </div>
              </div>

              <div className="obs-channel-item">
                <div className="obs-channel-icon-wrap">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="obs-channel-label">Telephonic Line</div>
                  <span className="obs-channel-val">{personal.phone}</span>
                </div>
              </div>

              <div className="obs-channel-item">
                <div className="obs-channel-icon-wrap">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="obs-channel-label">Station Coordinates</div>
                  <span className="obs-channel-val">{personal.location}</span>
                </div>
              </div>
            </div>

            {/* Social Network Plaque */}
            <div className="obs-contact-socials-row">
              <span className="obs-socials-row-label">OFFICIAL PROFILES:</span>
              <div className="obs-social-links-pills">
                <a
                  href={socials.github.url}
                  target="_blank"
                  rel="noreferrer"
                  className="obs-contact-pill"
                  title="Inspect Source Code on GitHub"
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                </a>

                {socials.linkedin && (
                  <a
                    href={socials.linkedin.url}
                    target="_blank"
                    rel="noreferrer"
                    className="obs-contact-pill"
                    title="Connect on LinkedIn"
                  >
                    <LinkedinIcon size={14} />
                    <span>LinkedIn</span>
                  </a>
                )}

                {socials.facebook && (
                  <a
                    href={socials.facebook.url}
                    target="_blank"
                    rel="noreferrer"
                    className="obs-contact-pill"
                    title="Facebook Communication"
                  >
                    <FacebookIcon size={14} />
                    <span>Facebook</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Cartographic Station Card */}
          <div className="obs-map-container-card">
            <div className="obs-card-bracket-tl" />
            <div className="obs-card-bracket-tr" />
            <div className="obs-card-bracket-bl" />
            <div className="obs-card-bracket-br" />

            <div className="obs-map-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <MapPin size={15} color="var(--brass)" />
                <span className="obs-map-title">Geographic Observation Post</span>
              </div>
              <span className="obs-map-coords">06°44'12" N, 125°21'40" E</span>
            </div>

            <div className="obs-map-frame">
              <InteractiveMap
                lat={personal.map_lat}
                lng={personal.map_lng}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
