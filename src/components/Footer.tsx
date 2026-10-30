import React from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';
import './Footer.css';

export const Footer: React.FC = () => {
  const { personal, socials } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="modern-footer-section">
      <div className="modern-footer-container">
        <div className="footer-top-row">
          {/* Brand */}
          <div className="footer-brand-col">
            <div className="footer-brand-title">
              <span className="logo-symbol">{'<'}</span>
              <span>andrei</span>
              <span className="logo-accent">.dev</span>
              <span className="logo-symbol">{'/>'}</span>
            </div>
            <p className="footer-brand-tagline">
              A curious mind, building for tomorrow. Designing and engineering modern web products with precision.
            </p>
          </div>

          {/* Socials */}
          <div className="footer-social-links">
            <a
              href={socials.github.url}
              target="_blank"
              rel="noreferrer"
              className="footer-social-btn"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>

            {socials.linkedin && (
              <a
                href={socials.linkedin.url}
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
            )}

            {socials.facebook && (
              <a
                href={socials.facebook.url}
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
            )}

            <button onClick={scrollToTop} className="footer-back-to-top" title="Scroll back to top" aria-label="Back to top">
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} {personal.name}. All rights reserved. Built with React, Vite & GSAP.
          </p>
          <span className="footer-status-pill">📍 Digos City, Philippines</span>
        </div>
      </div>
    </footer>
  );
};
