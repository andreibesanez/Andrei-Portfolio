import React from 'react';
import { Sparkles, Code2, Server, Wrench, Layers } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import './Skills.css';

export const Skills: React.FC = () => {
  const { skills } = portfolioData;

  const skillCategories = [
    {
      title: 'Frontend Architecture',
      icon: <Code2 size={16} />,
      items: skills.frontend,
      description: 'Building responsive, accessible interfaces with modern React, TypeScript, and state management.'
    },
    {
      title: 'Backend & APIs',
      icon: <Server size={16} />,
      items: skills.backend,
      description: 'Developing structured RESTful endpoints, MVC controllers, and application logic.'
    },
    {
      title: 'Developer Tools & Workflows',
      icon: <Wrench size={16} />,
      items: skills.tools.map((t) => ({ name: t.name })),
      description: 'Version control, API testing, Figma wireframes, and production cloud hosting pipelines.'
    }
  ];

  return (
    <section id="skills" className="workspace-section">
      <div className="workspace-content-container">
        
        {/* Header */}
        <div className="section-head-row">
          <div>
            <div className="section-tag">
              <Sparkles size={13} />
              <span>Skills & Stack</span>
            </div>
            <h2 className="section-title">Technical Craft & Instruments</h2>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="skills-category-grid">
          {skillCategories.map((cat, idx) => (
            <div
              key={cat.title}
              className="skill-category-card"
              data-speed={1 + idx * 0.03}
              data-lag={0.08 * (idx + 1)}
            >
              <div className="skill-cat-header">
                <span className="skill-cat-icon">{cat.icon}</span>
                <h3 className="skill-cat-title">{cat.title}</h3>
              </div>

              <p className="skill-cat-desc">{cat.description}</p>

              {/* Items List */}
              <div className="skills-badge-wrap">
                {cat.items.map((item) => (
                  <span key={item.name} className="skill-badge">
                    <span className="skill-badge-dot" />
                    <span>{item.name}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Current Exploration & Learning */}
        <div className="skills-learning-card">
          <div className="learning-title-row">
            <Layers size={16} className="learning-icon" />
            <h4 className="learning-title">Current Technical Explorations</h4>
          </div>
          <div className="learning-tags-row">
            {skills.learning.map((topic) => (
              <span key={topic} className="learning-pill">
                ✦ {topic}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
