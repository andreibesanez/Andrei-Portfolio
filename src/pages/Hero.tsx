import React from 'react';
import { ArrowDown, MapPin, CheckCircle } from 'lucide-react';
import { MascotCat } from '../components/MascotCat';
import { IllustratedDesk } from '../components/IllustratedDesk';
import { portfolioData } from '../data/portfolioData';
import './Hero.css';

interface HeroProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateSection }) => {
  const { personal, socials } = portfolioData;

  return (
    <section id="hero" className="workspace-hero-section">
      <div className="workspace-hero-container">
        
        {/* Mascot Sleeping Above Introduction with subtle lag */}
        <div data-lag="0.15">
          <MascotCat />
        </div>

        {/* Greeting & Personal Introduction */}
        <div className="hero-intro-header" data-speed="1">
          <p className="hero-eyebrow-greeting">Hey! I'm</p>
          <h1 className="hero-author-name">
            {personal.name}
            <span className="hero-verified-badge" title="Verified Portfolio Creator">
              <CheckCircle size={22} className="verified-icon" />
            </span>
          </h1>

          <p className="hero-tagline-text">
            An <span className="highlight-role">Information Technology scholar</span> & aspiring software developer 
            crafting thoughtful, responsive web interfaces and verifiable digital systems.
          </p>
        </div>

        {/* Illustrated Interactive Desk Studio with slight organic lag */}
        <div data-lag="0.25" style={{ width: '100%' }}>
          <IllustratedDesk />
        </div>

        {/* Location & Real-time Status */}
        <div className="hero-meta-row">
          <div className="hero-location-pill">
            <MapPin size={14} className="pin-icon" />
            <span>Digos City, Philippines</span>
          </div>

          <div className="hero-social-links">
            <a
              href={socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-item"
              title="GitHub Profile"
            >
              GitHub
            </a>
            {socials.linkedin && (
              <>
                <span className="dot-sep">•</span>
                <a
                  href={socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-item"
                  title="LinkedIn Profile"
                >
                  LinkedIn
                </a>
              </>
            )}
            {socials.facebook && (
              <>
                <span className="dot-sep">•</span>
                <a
                  href={socials.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-item"
                  title="Facebook Profile"
                >
                  Facebook
                </a>
              </>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => onNavigateSection('about')}
          className="hero-scroll-indicator"
          aria-label="Scroll down to About section"
        >
          <span className="scroll-label">Explore Workspace</span>
          <span className="scroll-chevron">
            <ArrowDown size={16} />
          </span>
        </button>

      </div>
    </section>
  );
};
