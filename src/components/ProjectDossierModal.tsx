import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Layers, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { ProjectItem } from '../types/portfolio';
import './ProjectDossierModal.css';

interface ProjectDossierModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDossierModal: React.FC<ProjectDossierModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tech' | 'role'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="obs-dossier-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Archival Dossier: ${project.title}`}>
      <div className="obs-dossier-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Corner Brackets */}
        <div className="obs-card-bracket-tl" />
        <div className="obs-card-bracket-tr" />
        <div className="obs-card-bracket-bl" />
        <div className="obs-card-bracket-br" />

        {/* Header */}
        <div className="obs-dossier-header">
          <div className="obs-dossier-meta">
            <span className="obs-dossier-cat-pill">
              {project.catalog_no || 'OBS-FOLIO'} • {project.category || 'SOFTWARE APPLICATION'}
            </span>
            <h2 className="obs-dossier-title">{project.title}</h2>
            <span className="obs-dossier-year">Preserved Record • Epoch {project.year || '2026'}</span>
          </div>

          <button onClick={onClose} className="obs-dossier-close-btn" aria-label="Close Archival Dossier">
            <X size={18} />
          </button>
        </div>

        {/* Visual Banner Preview */}
        {project.image && (
          <div className="obs-dossier-img-box">
            <img src={project.image} alt={project.title} loading="lazy" />
          </div>
        )}

        {/* Tab Selector */}
        <div className="obs-dossier-tabs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`obs-dossier-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          >
            <Layers size={13} />
            <span>Overview & Purpose</span>
          </button>
          <button
            onClick={() => setActiveTab('tech')}
            className={`obs-dossier-tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
          >
            <Terminal size={13} />
            <span>Technical Arsenal</span>
          </button>
          <button
            onClick={() => setActiveTab('role')}
            className={`obs-dossier-tab-btn ${activeTab === 'role' ? 'active' : ''}`}
          >
            <Sparkles size={13} />
            <span>Role & Execution</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="obs-dossier-tab-content">
          {activeTab === 'overview' && (
            <div className="obs-dossier-overview-tab">
              <h3 className="obs-dossier-section-title">Archival Summary</h3>
              <p className="obs-dossier-desc-text">{project.description}</p>
              
              {project.title.toLowerCase().includes('chainbudget') && (
                <div className="obs-dossier-note-box">
                  <span className="obs-note-tag">BLOCKCHAIN INTEGRATION NOTE</span>
                  <p>
                    Chainbudget was engineered as an undergraduate capstone project exploring transparent institutional budget monitoring using Stellar distributed ledgers. Smart ledger concepts are demonstrated in a prototype environment.
                  </p>
                </div>
              )}

              {project.title.toLowerCase().includes('4ps') && (
                <div className="obs-dossier-note-box">
                  <span className="obs-note-tag">HACKATHON CONCEPT SPECIFICATION</span>
                  <p>
                    Developed as a hackathon prototype exploring Soroban smart contracts on Stellar for verifiable, conditional Philippine social welfare disbursements.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="obs-dossier-tech-tab">
              <h3 className="obs-dossier-section-title">Instruments & Architecture</h3>
              <div className="obs-dossier-tech-grid">
                {project.tags.map((t) => (
                  <div key={t} className="obs-dossier-tech-item">
                    <CheckCircle2 size={14} color="var(--brass)" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'role' && (
            <div className="obs-dossier-role-tab">
              <h3 className="obs-dossier-section-title">Scholar's Direct Contribution</h3>
              <p className="obs-dossier-desc-text">
                <strong>Assigned Responsibility:</strong> {project.role || 'Full-Stack Developer & Interface Craftsmanship'}
              </p>
              <p className="obs-dossier-desc-text" style={{ marginTop: '0.65rem' }}>
                Focused on ensuring code clarity, responsive design tokens, precise system documentation, and reliable integration between UI components and backend/ledger endpoints.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="obs-dossier-footer">
          <div className="obs-dossier-repo-actions">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="obs-btn-link"
              >
                <GithubIcon size={14} />
                <span>{project.github_backend_url ? 'Client Repo' : 'Source Code'}</span>
              </a>
            )}

            {project.github_backend_url && (
              <a
                href={project.github_backend_url}
                target="_blank"
                rel="noreferrer"
                className="obs-btn-link"
              >
                <GithubIcon size={14} />
                <span>API Repo</span>
              </a>
            )}
          </div>

          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className="btn-brass-primary"
              style={{ padding: '0.55rem 1.25rem' }}
            >
              <span>Launch Live Demonstration</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
