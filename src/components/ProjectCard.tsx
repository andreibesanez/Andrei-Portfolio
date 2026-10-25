import React from 'react';
import { ExternalLink, Compass, FileText } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { ProjectItem } from '../types/portfolio';
import './ProjectCard.css';

interface ProjectCardProps {
  project: ProjectItem;
  className?: string;
  onOpenDossier?: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className, onOpenDossier }) => {
  return (
    <article className={`obs-project-card ${className || ''}`}>
      {/* Corner Brackets */}
      <div className="obs-card-bracket-tl" />
      <div className="obs-card-bracket-tr" />
      <div className="obs-card-bracket-bl" />
      <div className="obs-card-bracket-br" />

      {/* Image or Scientific Fallback */}
      <div
        className="obs-project-image-box"
        onClick={() => onOpenDossier && onOpenDossier(project)}
        style={{ cursor: onOpenDossier ? 'pointer' : 'default' }}
        title="Click to inspect archival dossier"
      >
        {project.catalog_no && (
          <span className="obs-project-catalog-badge">{project.catalog_no}</span>
        )}

        {project.image ? (
          <img src={project.image} alt={project.title} loading="lazy" />
        ) : (
          <div className="obs-project-fallback-art">
            <svg
              viewBox="0 0 300 180"
              style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, opacity: 0.8 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="150" cy="90" r="75" fill="none" stroke="var(--brass)" strokeWidth="0.8" opacity="0.35" strokeDasharray="3 4" />
              <circle cx="150" cy="90" r="50" fill="none" stroke="var(--brass)" strokeWidth="0.8" opacity="0.5" />
              <circle cx="150" cy="90" r="28" fill="none" stroke="var(--brass)" strokeWidth="0.8" opacity="0.65" strokeDasharray="2 3" />
              <line x1="150" y1="10" x2="150" y2="170" stroke="var(--brass)" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.3" />
              <line x1="50" y1="90" x2="250" y2="90" stroke="var(--brass)" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.3" />
              <circle cx="110" cy="65" r="2.5" fill="var(--brass)" />
              <circle cx="190" cy="115" r="2.5" fill="var(--brass)" />
              <circle cx="150" cy="90" r="3.5" fill="var(--gold)" />
            </svg>
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
              <Compass size={38} strokeWidth={1.3} color="var(--brass)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.12em', color: 'var(--brass)', textTransform: 'uppercase' }}>
                CATALOG SCHEMATIC • {project.catalog_no || 'FOLIO'}
              </span>
            </div>
          </div>
        )}

        {onOpenDossier && (
          <div className="obs-project-dossier-pill">
            <FileText size={12} />
            <span>Inspect Dossier</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="obs-project-body">
        {project.category && (
          <span className="obs-project-category">{project.category}</span>
        )}
        <h3
          className="obs-project-title"
          onClick={() => onOpenDossier && onOpenDossier(project)}
          style={{ cursor: onOpenDossier ? 'pointer' : 'default' }}
        >
          {project.title}
        </h3>
        <p className="obs-project-desc">{project.description}</p>

        {/* Technologies List */}
        <div className="obs-project-tech-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="obs-tech-tag">{tag}</span>
          ))}
        </div>

        {/* Action Links */}
        <div className="obs-project-actions">
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="obs-btn-link"
                title="Inspect Source Code on GitHub"
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
                title="Inspect Backend API on GitHub"
              >
                <GithubIcon size={14} />
                <span>API Repo</span>
              </a>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            {onOpenDossier && (
              <button
                onClick={() => onOpenDossier(project)}
                className="obs-btn-link"
                title="Open detailed archival technical dossier"
              >
                <FileText size={13} />
                <span>Dossier</span>
              </button>
            )}

            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer"
                className="obs-btn-link obs-btn-demo"
                title="Launch Live Demonstration"
              >
                <span>Live Demo</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
