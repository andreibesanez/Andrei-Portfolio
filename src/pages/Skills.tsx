import React, { useEffect, useRef } from 'react';
import {
  Compass,
  CheckCircle2,
  GitBranch,
  Code,
  PenTool,
  Send,
  Globe,
  Atom,
  Zap,
  Triangle,
  Hexagon,
  Database,
  Waves,
  Network,
  Flame,
  Layout,
  Server,
  Layers,
  Sparkles,
  BookOpen,
  Mail
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';
import { DiscoveryMarker } from '../components/DiscoveryMarker';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

export const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { skills } = portfolioData;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      // Section title reveal
      tl.from('.obs-section-header', {
        y: 25,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out',
        clearProps: 'all'
      }, 0);

      // Groups reveal gently
      tl.from('.obs-skills-category-group', {
        y: 25,
        opacity: 0,
        duration: 0.65,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'all'
      }, 0.1);

      // Skill tiles tactile entrance - NO opacity 0 start to ensure zero invisibility
      tl.from('.obs-skill-tile', {
        y: 16,
        duration: 0.45,
        stagger: 0.025,
        ease: 'power2.out',
        clearProps: 'all'
      }, 0.2);

      // Right Column enters
      tl.from('.obs-skills-side-col', {
        y: 25,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out',
        clearProps: 'all'
      }, 0.15);

      // Bottom inquiry plaque reveal
      tl.from('.obs-skills-inquiry-plaque', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'all'
      }, 0.35);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getSkillCategory = (name: string): string => {
    switch (name) {
      case 'HTML5': return 'STRUCTURE';
      case 'CSS3': return 'STYLING';
      case 'JavaScript (ES6+)': return 'CORE';
      case 'TypeScript': return 'TYPING';
      case 'React 19': return 'ENGINE';
      case 'Next.js': return 'FULLSTACK';
      case 'Tailwind CSS': return 'DESIGN';
      case 'Vite': return 'BUNDLER';
      case 'GSAP Animations': return 'MOTION';
      case 'PHP 8.2+': return 'SERVER';
      case 'Laravel 12': return 'FRAMEWORK';
      case 'Node.js': return 'RUNTIME';
      case 'MySQL': return 'RELATIONAL';
      case 'SQLite': return 'EMBEDDED';
      case 'MongoDB': return 'DOCUMENT';
      case 'Firebase': return 'CLOUD';
      case 'RESTful APIs': return 'PROTOCOL';
      default: return 'INSTRUMENT';
    }
  };

  const renderLucideGlyph = (name?: string) => {
    switch (name) {
      case 'Atom': return <Atom size={22} />;
      case 'Zap': return <Zap size={22} />;
      case 'Compass': return <Compass size={22} />;
      case 'Waves': return <Waves size={22} />;
      case 'Layers': return <Layers size={22} />;
      case 'Triangle': return <Triangle size={22} />;
      case 'Hexagon': return <Hexagon size={22} />;
      case 'Database': return <Database size={22} />;
      case 'Flame': return <Flame size={22} />;
      case 'Network': return <Network size={22} />;
      default: return <Code size={22} />;
    }
  };

  const renderToolIcon = (name: string) => {
    switch (name) {
      case 'GitBranch': return <GitBranch size={15} color="var(--brass)" />;
      case 'Code': return <Code size={15} color="var(--brass)" />;
      case 'PenTool': return <PenTool size={15} color="var(--brass)" />;
      case 'Send': return <Send size={15} color="var(--brass)" />;
      case 'Globe': return <Globe size={15} color="var(--brass)" />;
      default: return <Compass size={15} color="var(--brass)" />;
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="skills" ref={containerRef} className="obs-skills-chamber">
      <div className="obs-section-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div className="obs-catalog-tag">Section III • Scientific Instruments</div>
          {/* Celestial Discovery Marker 3 */}
          <DiscoveryMarker id="obs-skills-03" label="Arsenal Seal" />
        </div>
        <h2 className="obs-section-title">Technical Proficiencies & Arsenal</h2>
        <p className="obs-section-subtitle">
          The languages, design systems, frameworks, and instruments applied to craft resilient, responsive, and maintainable software.
        </p>
      </div>

      <div className="obs-skills-layout">
        {/* Left Column: Frontend & Backend Catalog */}
        <div className="obs-skills-main-col">
          {/* Frontend Instruments */}
          <div className="obs-skills-category-group">
            <div className="obs-skills-cat-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Layout size={20} color="var(--brass)" />
                <span className="obs-cat-roman">A.</span>
                <h3 className="obs-cat-title">Frontend Engineering</h3>
              </div>
              <span className="obs-cat-count-badge">{skills.frontend.length} Instruments</span>
            </div>

            <div className="obs-skills-grid">
              {skills.frontend.map((item, idx) => (
                <div key={item.name} className="obs-skill-tile">
                  <div className="obs-tile-corner-tl" />
                  <div className="obs-tile-corner-br" />
                  
                  <div className="obs-skill-tile-top">
                    <span className="obs-skill-cat-pill">{getSkillCategory(item.name)}</span>
                    <span className="obs-skill-reg-num">FE-{String(idx + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="obs-skill-glyph">
                    {item.icon_type === 'text' ? (
                      <span className="obs-skill-glyph-text">{item.icon_text}</span>
                    ) : (
                      renderLucideGlyph(item.icon_name)
                    )}
                  </div>

                  <div className="obs-skill-details">
                    <span className="obs-skill-name">{item.name}</span>
                    <div className="obs-skill-status">
                      <span className="obs-skill-status-dot" />
                      <span className="obs-skill-status-label">Operational</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend & Systems */}
          <div className="obs-skills-category-group">
            <div className="obs-skills-cat-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Server size={20} color="var(--brass)" />
                <span className="obs-cat-roman">B.</span>
                <h3 className="obs-cat-title">Backend Architecture & Data</h3>
              </div>
              <span className="obs-cat-count-badge">{skills.backend.length} Instruments</span>
            </div>

            <div className="obs-skills-grid">
              {skills.backend.map((item, idx) => (
                <div key={item.name} className="obs-skill-tile">
                  <div className="obs-tile-corner-tl" />
                  <div className="obs-tile-corner-br" />

                  <div className="obs-skill-tile-top">
                    <span className="obs-skill-cat-pill">{getSkillCategory(item.name)}</span>
                    <span className="obs-skill-reg-num">BE-{String(idx + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="obs-skill-glyph">
                    {item.icon_type === 'text' ? (
                      <span className="obs-skill-glyph-text">{item.icon_text}</span>
                    ) : (
                      renderLucideGlyph(item.icon_name)
                    )}
                  </div>

                  <div className="obs-skill-details">
                    <span className="obs-skill-name">{item.name}</span>
                    <div className="obs-skill-status">
                      <span className="obs-skill-status-dot" />
                      <span className="obs-skill-status-label">Operational</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Precision Tools & Core Strengths */}
        <div className="obs-skills-side-col">
          {/* Tools Panel */}
          <div className="obs-side-panel">
            <div className="obs-card-bracket-tl" />
            <div className="obs-card-bracket-tr" />
            <div className="obs-card-bracket-bl" />
            <div className="obs-card-bracket-br" />

            <h4 className="obs-panel-title">
              <Compass size={18} color="var(--brass)" />
              <span>Precision Instruments</span>
            </h4>
            <div className="obs-tools-badges">
              {skills.tools.map((tool) => (
                <span key={tool.name} className="obs-tool-badge">
                  {renderToolIcon(tool.icon)}
                  <span>{tool.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Strengths Panel */}
          <div className="obs-side-panel">
            <div className="obs-card-bracket-tl" />
            <div className="obs-card-bracket-tr" />
            <div className="obs-card-bracket-bl" />
            <div className="obs-card-bracket-br" />

            <h4 className="obs-panel-title">
              <CheckCircle2 size={18} color="var(--brass)" />
              <span>Disciplines of Craft</span>
            </h4>
            <ul className="obs-strengths-items">
              {skills.strengths.map((str) => (
                <li key={str} className="obs-strength-entry">
                  <CheckCircle2 size={16} color="var(--brass)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Current Stargazing */}
          <div className="obs-side-panel" style={{ backgroundColor: 'var(--parchment)' }}>
            <div className="obs-card-bracket-tl" />
            <div className="obs-card-bracket-tr" />
            <div className="obs-card-bracket-bl" />
            <div className="obs-card-bracket-br" />

            <h4 className="obs-panel-title" style={{ fontSize: '1.15rem' }}>
              <BookOpen size={16} color="var(--brass)" />
              <span>Active Stargazing (Learning)</span>
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Continuously extending inquiry into emerging engineering frontiers:
            </p>
            <div className="obs-learning-pills">
              {skills.learning.map((item) => (
                <span key={item} className="obs-learning-pill">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Specific Skill Inquiry Plaque */}
      <div className="obs-skills-inquiry-plaque">
        <div className="obs-card-bracket-tl" />
        <div className="obs-card-bracket-tr" />
        <div className="obs-card-bracket-bl" />
        <div className="obs-card-bracket-br" />

        <div className="obs-inquiry-content">
          <div className="obs-inquiry-tag">
            <Sparkles size={14} color="var(--brass)" />
            <span>EXPEDITION READINESS • ADAPTABLE TOOLING</span>
          </div>
          <h3 className="obs-inquiry-title">Looking for a specific instrument or technical stack?</h3>
          <p className="obs-inquiry-desc">
            I am highly adaptable, learning emerging frameworks, paradigms, and runtime environments with rigorous speed to satisfy project requirements.
          </p>
        </div>

        <button onClick={scrollToContact} className="btn-brass-primary">
          <span>Inquire With Scholar</span>
          <Mail size={15} />
        </button>
      </div>
    </section>
  );
};
