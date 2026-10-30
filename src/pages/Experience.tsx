import React from 'react';
import { Briefcase, Calendar, Building2, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import './Experience.css';

export const Experience: React.FC = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="workspace-section">
      <div className="workspace-content-container">
        
        {/* Header */}
        <div className="section-head-row">
          <div>
            <div className="section-tag">
              <Briefcase size={13} />
              <span>Experience</span>
            </div>
            <h2 className="section-title">Academic Leadership & Technical Roles</h2>
          </div>
        </div>

        {/* Timeline Stack */}
        <div className="experience-timeline">
          {experience.map((item, idx) => (
            <div key={idx} className="timeline-entry">
              <div className="timeline-marker">
                <span className="marker-dot" />
                {idx !== experience.length - 1 && <span className="marker-line" />}
              </div>

              <div className="timeline-card">
                <div className="entry-header">
                  <div>
                    <h3 className="entry-title">{item.title}</h3>
                    <div className="entry-company-row">
                      <Building2 size={13} className="company-icon" />
                      <span className="entry-company">{item.company}</span>
                    </div>
                  </div>

                  <div className="entry-date-pill">
                    <Calendar size={12} />
                    <span>{item.duration}</span>
                  </div>
                </div>

                <p className="entry-desc">{item.description}</p>

                {/* Accomplishments */}
                <ul className="entry-points-list">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx}>
                      <CheckCircle2 size={13} className="pt-icon" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="entry-tags-row">
                  {item.tags.map((tag) => (
                    <span key={tag} className="entry-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
