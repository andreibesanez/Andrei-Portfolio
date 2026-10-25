import React from 'react';
import { X, Printer, Mail, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import './ResumeModal.css';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { personal, skills, experience } = portfolioData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className={`obs-modal-backdrop ${isOpen ? 'open' : ''}`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        className="obs-modal-window"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="resume-title"
      >
        {/* Corner Brackets */}
        <div className="obs-card-bracket-tl" />
        <div className="obs-card-bracket-tr" />
        <div className="obs-card-bracket-bl" />
        <div className="obs-card-bracket-br" />

        <button
          className="obs-modal-close"
          onClick={onClose}
          aria-label="Close Curriculum Vitae"
        >
          <X size={18} />
        </button>

        <div className="obs-resume-header">
          <h2 id="resume-title" className="obs-resume-title">{personal.name}</h2>
          <div className="obs-resume-sub">{personal.role} • Cor Jesu College</div>
          <div className="obs-resume-contact-bar">
            <span><Mail size={12} style={{ display: 'inline', marginRight: '4px' }} />{personal.email}</span>
            <span>{personal.phone}</span>
            <span><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />Digos City, Philippines</span>
          </div>
        </div>

        {/* Education */}
        <div className="obs-resume-section">
          <h3 className="obs-resume-section-heading">✦ Academic Background</h3>
          <div className="obs-resume-item">
            <div className="obs-resume-item-top">
              <span className="obs-resume-item-role">{personal.education.degree}</span>
              <span className="obs-resume-item-date">{personal.education.year}</span>
            </div>
            <div className="obs-resume-item-org">{personal.education.school}</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {personal.education.description_p1}
            </p>
          </div>
        </div>

        {/* Technical Proficiencies */}
        <div className="obs-resume-section">
          <h3 className="obs-resume-section-heading">✦ Technical Proficiencies</h3>
          <div className="obs-resume-skills-grid">
            <div>
              <strong>Frontend:</strong> {skills.frontend.map((s) => s.name).join(', ')}
            </div>
            <div>
              <strong>Backend & Data:</strong> {skills.backend.map((s) => s.name).join(', ')}
            </div>
            <div>
              <strong>Instruments:</strong> {skills.tools.map((t) => t.name).join(', ')}
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="obs-resume-section">
          <h3 className="obs-resume-section-heading">✦ Practical Experience & Projects</h3>
          {experience.map((job) => (
            <div key={job.title} className="obs-resume-item">
              <div className="obs-resume-item-top">
                <span className="obs-resume-item-role">{job.title}</span>
                <span className="obs-resume-item-date">{job.duration}</span>
              </div>
              <div className="obs-resume-item-org">{job.company}</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                {job.description}
              </p>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                {job.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="obs-modal-actions">
          <button onClick={handlePrint} className="btn-brass-primary">
            <Printer size={15} />
            <span>Print / Save Manuscript</span>
          </button>
          <button onClick={onClose} className="btn-parchment-secondary">
            <span>Dismiss</span>
          </button>
        </div>
      </div>
    </div>
  );
};
