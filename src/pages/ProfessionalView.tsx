import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, GraduationCap, Briefcase, FolderGit2, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { portfolioData } from '../data/portfolioData';
import './ProfessionalView.css';

export const ProfessionalView: React.FC = () => {
  const { personal, socials, experience, projects, skills } = portfolioData;

  return (
    <div className="pro-view-wrapper">
      {/* Top Header Bar */}
      <header className="pro-view-header">
        <div className="pro-header-container">
          <Link to="/" className="pro-back-btn">
            <ArrowLeft size={16} />
            <span>Back to Illustrated Portfolio</span>
          </Link>

          <a
            href={personal.resume_link}
            onClick={(e) => {
              if (personal.resume_link === '#') {
                e.preventDefault();
                alert('Official resume PDF is available upon verified recruiter request. Feel free to contact Andrei directly at ' + personal.email);
              }
            }}
            className="btn-primary pro-download-btn"
          >
            <Download size={15} />
            <span>Download Resume</span>
          </a>
        </div>
      </header>

      {/* Structured Clean Resume Document */}
      <main className="pro-document-container">
        
        {/* Candidate Summary */}
        <section className="pro-candidate-header">
          <div className="pro-candidate-details">
            <h1 className="pro-name">{personal.name}</h1>
            <p className="pro-title">Information Technology Scholar & Aspiring Web Developer</p>
            <p className="pro-location">Digos City, Davao del Sur, Philippines • {personal.email} • {personal.phone}</p>
            
            <div className="pro-socials">
              <a href={socials.github.url} target="_blank" rel="noopener noreferrer">
                <GithubIcon size={14} /> GitHub: {socials.github.username}
              </a>
              {socials.linkedin && (
                <>
                  <span>•</span>
                  <a href={socials.linkedin.url} target="_blank" rel="noopener noreferrer">
                    <LinkedinIcon size={14} /> LinkedIn: {socials.linkedin.username}
                  </a>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="pro-section">
          <h2 className="pro-section-title">Professional Summary</h2>
          <p className="pro-summary-text">
            Undergraduate Information Technology student with dedicated focus on modern frontend architecture, 
            relational database design, and verifiable distributed systems. Proven track record in leading capstone documentation, 
            building responsive React and TypeScript applications, and implementing normalized SQL backend architectures. 
            Committed to engineering accessible, performant software with high visual and technical standards.
          </p>
        </section>

        {/* Education */}
        <section className="pro-section">
          <div className="pro-sec-head">
            <GraduationCap size={18} className="pro-sec-icon" />
            <h2 className="pro-section-title">Education</h2>
          </div>

          <div className="pro-entry">
            <div className="pro-entry-top">
              <h3 className="pro-entry-title">{personal.education.degree}</h3>
              <span className="pro-entry-date">{personal.education.year}</span>
            </div>
            <p className="pro-entry-sub">{personal.education.school}</p>
            <p className="pro-entry-desc">{personal.education.description_p1}</p>
          </div>
        </section>

        {/* Technical Experience */}
        <section className="pro-section">
          <div className="pro-sec-head">
            <Briefcase size={18} className="pro-sec-icon" />
            <h2 className="pro-section-title">Experience & Capstone Leadership</h2>
          </div>

          {experience.map((exp, idx) => (
            <div key={idx} className="pro-entry">
              <div className="pro-entry-top">
                <h3 className="pro-entry-title">{exp.title}</h3>
                <span className="pro-entry-date">{exp.duration}</span>
              </div>
              <p className="pro-entry-sub">{exp.company}</p>
              <p className="pro-entry-desc">{exp.description}</p>
              <ul className="pro-bullet-list">
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Key Projects */}
        <section className="pro-section">
          <div className="pro-sec-head">
            <FolderGit2 size={18} className="pro-sec-icon" />
            <h2 className="pro-section-title">Key Projects & Technical Works</h2>
          </div>

          {projects.map((proj) => (
            <div key={proj.catalog_no} className="pro-entry">
              <div className="pro-entry-top">
                <h3 className="pro-entry-title">
                  {proj.title} <span className="pro-category-tag">[{proj.category}]</span>
                </h3>
                <span className="pro-entry-date">{proj.year}</span>
              </div>
              <p className="pro-entry-sub">Role: {proj.role}</p>
              <p className="pro-entry-desc">{proj.description}</p>
              <div className="pro-tech-chips">
                {proj.tags.map((tag) => (
                  <span key={tag} className="pro-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Technical Skills */}
        <section className="pro-section">
          <div className="pro-sec-head">
            <Sparkles size={18} className="pro-sec-icon" />
            <h2 className="pro-section-title">Technical Skills & Competencies</h2>
          </div>

          <div className="pro-skills-table">
            <div className="skills-row">
              <span className="skills-row-label">Frontend:</span>
              <span className="skills-row-content">
                {skills.frontend.map((s) => s.name).join(', ')}
              </span>
            </div>
            <div className="skills-row">
              <span className="skills-row-label">Backend & DB:</span>
              <span className="skills-row-content">
                {skills.backend.map((s) => s.name).join(', ')}
              </span>
            </div>
            <div className="skills-row">
              <span className="skills-row-label">Tools & Workflow:</span>
              <span className="skills-row-content">
                {skills.tools.map((s) => s.name).join(', ')}
              </span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};
