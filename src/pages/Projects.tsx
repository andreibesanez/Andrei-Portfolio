import React, { useLayoutEffect, useState } from 'react';
import { FolderGit2, ExternalLink, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { GithubIcon } from '../components/SocialIcons';
import { portfolioData } from '../data/portfolioData';
import './Projects.css';

// Register Flip plugin
gsap.registerPlugin(Flip);

interface ProjectModalProps {
  project: typeof portfolioData.projects[0];
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <div
      className="project-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="project-modal-card"
        data-flip-id={`project-card-${project.catalog_no}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-category-badge">{project.category}</div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="modal-image-wrapper">
          <img
            src={project.image}
            alt={project.title}
            className="modal-img"
            data-flip-id={`project-img-${project.catalog_no}`}
          />
        </div>

        <div className="modal-content">
          <h3 className="modal-title">{project.title}</h3>
          <p className="modal-role-year">
            Role: <strong>{project.role}</strong> • Year: {project.year}
          </p>

          <p className="modal-desc">{project.description}</p>

          {/* Architecture & Engineering Highlights */}
          <div className="modal-architecture-box">
            <h4 className="arch-heading">Architecture & Implementation</h4>
            <ul className="arch-points">
              <li>
                <CheckCircle2 size={14} className="check-icon" />
                <span>Responsive interface architecture designed for mobile and desktop screens.</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="check-icon" />
                <span>Modular components with strict TypeScript contracts and REST/ledger integrations.</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="check-icon" />
                <span>Comprehensive documentation and version-controlled Git workflows.</span>
              </li>
            </ul>
          </div>

          <div className="modal-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag-pill">
                {tag}
              </span>
            ))}
          </div>

          <div className="modal-actions-row">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary modal-btn"
              >
                <GithubIcon size={16} />
                <span>View Source Code</span>
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary modal-btn"
              >
                <ExternalLink size={16} />
                <span>Open Live Deployment</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<typeof portfolioData.projects[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'fullstack' | 'blockchain' | 'cli'>('all');

  // Pause ScrollSmoother while modal is open (per GSAP documentation)
  useLayoutEffect(() => {
    const smoother = (window as unknown as { ScrollSmoother?: { get: () => { paused: (p: boolean) => void } } })
      .ScrollSmoother?.get?.();
    if (smoother) {
      smoother.paused(!!selectedProject);
    }
  }, [selectedProject]);

  const filteredProjects = projects.filter((p) => {
    const category = p.category ? p.category.toLowerCase() : '';
    if (activeFilter === 'all') return true;
    if (activeFilter === 'fullstack') return category.includes('full-stack') || category.includes('backend');
    if (activeFilter === 'blockchain') return category.includes('blockchain') || category.includes('smart');
    if (activeFilter === 'cli') return category.includes('cli');
    return true;
  });

  // FLIP ANIMATION ON FILTER SWITCH
  const handleFilterClick = (filter: 'all' | 'fullstack' | 'blockchain' | 'cli') => {
    if (filter === activeFilter) return;

    // 1. FIRST: Capture current state of all project cards
    const state = Flip.getState('.project-card', {
      props: 'opacity,transform',
    });

    // 2. State change in React
    setActiveFilter(filter);

    // 3. INVERT & PLAY: Animate seamlessly to new layout
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.06,
        absolute: true,
        scale: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0.88, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' }
          ),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, scale: 0.85, duration: 0.35, ease: 'power2.in' }),
      });
    });
  };

  return (
    <section id="projects" className="workspace-section">
      <div className="workspace-content-container">
        
        {/* Header */}
        <div className="section-head-row">
          <div>
            <div className="section-tag">
              <FolderGit2 size={13} />
              <span>Project Folio</span>
            </div>
            <h2 className="section-title">Selected Works & Engineering Lab</h2>
          </div>

          {/* Filter Pills */}
          <div className="project-filter-pills" role="tablist">
            <button
              onClick={() => handleFilterClick('all')}
              className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
            >
              All ({projects.length})
            </button>
            <button
              onClick={() => handleFilterClick('fullstack')}
              className={`filter-pill ${activeFilter === 'fullstack' ? 'active' : ''}`}
            >
              Full-Stack & Backend
            </button>
            <button
              onClick={() => handleFilterClick('blockchain')}
              className={`filter-pill ${activeFilter === 'blockchain' ? 'active' : ''}`}
            >
              Blockchain
            </button>
            <button
              onClick={() => handleFilterClick('cli')}
              className={`filter-pill ${activeFilter === 'cli' ? 'active' : ''}`}
            >
              CLI
            </button>
          </div>
        </div>

        {/* Project Cards Grid with GSAP Flip Target IDs */}
        <div className="projects-card-grid">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.catalog_no}
              data-flip-id={`project-card-${project.catalog_no}`}
              className="project-card"
              data-speed={idx % 2 === 0 ? '1.04' : '0.97'}
              data-lag={0.05 * (idx + 1)}
              onClick={() => setSelectedProject(project)}
            >
              {/* Thumbnail Container */}
              <div className="project-image-box">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-card-img"
                  data-flip-id={`project-img-${project.catalog_no}`}
                  data-speed="auto"
                  onError={(e) => {
                    (e.target as HTMLElement).style.opacity = '0.5';
                  }}
                />
                <span className="project-catalog-badge">{project.catalog_no}</span>
                {project.is_featured && <span className="featured-badge">Featured</span>}
              </div>

              {/* Card Body */}
              <div className="project-card-body">
                <div className="project-category-row">
                  <span className="project-cat-name">{project.category}</span>
                  <span className="project-year">{project.year}</span>
                </div>

                <h3 className="project-card-title">
                  {project.title}
                  <ArrowUpRight size={16} className="card-arrow-icon" />
                </h3>

                <p className="project-card-desc">{project.description}</p>

                {/* Tech Tags */}
                <div className="project-tags-row">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="project-tag-pill">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="project-tag-more">+{project.tags.length - 3}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Detail Drilldown Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
