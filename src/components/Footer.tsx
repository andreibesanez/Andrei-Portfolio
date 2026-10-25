import React, { useState } from 'react';
import { Mail, Compass, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';
import './Footer.css';

export const Footer: React.FC = () => {
  const { personal, socials } = portfolioData;
  const [activeStar, setActiveStar] = useState<string | null>(null);

  const footerStars = [
    { id: 'alnitak', name: 'Alnitak', cx: 40, cy: 55, lore: 'Zeta Ori • 1,260 LY' },
    { id: 'alnilam', name: 'Alnilam', cx: 70, cy: 50, lore: 'Epsilon Ori • 2,000 LY' },
    { id: 'mintaka', name: 'Mintaka', cx: 100, cy: 45, lore: 'Delta Ori • 1,200 LY' },
    { id: 'betelgeuse', name: 'Betelgeuse', cx: 20, cy: 15, lore: 'Alpha Ori • Supergiant' },
    { id: 'bellatrix', name: 'Bellatrix', cx: 120, cy: 10, lore: 'Gamma Ori • 250 LY' },
    { id: 'saiph', name: 'Saiph', cx: 25, cy: 90, lore: 'Kappa Ori • 650 LY' },
    { id: 'rigel', name: 'Rigel', cx: 115, cy: 85, lore: 'Beta Ori • Luminosity Class I' }
  ];

  return (
    <footer className="obs-footer">
      <div className="obs-footer-inner">
        <div className="obs-footer-top">
          <div className="obs-footer-colophon">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <Compass size={15} color="var(--brass)" />
              <h3 className="obs-footer-title">The Classical Observatory</h3>
            </div>
            <p className="obs-footer-tagline">
              Dedicated to the continuous study of web craftsmanship, interface clarity, and functional software engineering.
            </p>
            <span className="obs-footer-coords">
              DIGOS CITY, PHILIPPINES • 06°44' N, 125°21' E • STATION 2026
            </span>
          </div>

          {/* Interactive Mini Constellation Plate */}
          <div className="obs-footer-constellation-plate" title="Interactive Asterism • Hover stars to inspect coordinates">
            <div className="obs-constellation-plate-header">
              <Sparkles size={11} color="var(--brass)" />
              <span>ORION MERIDIAN ENGRAVING</span>
            </div>

            <svg viewBox="0 0 140 100" className="obs-footer-constellation-svg">
              {/* Constellation lines */}
              <line x1="20" y1="15" x2="40" y2="55" stroke="var(--brass)" strokeWidth="0.8" opacity="0.4" />
              <line x1="120" y1="10" x2="100" y2="45" stroke="var(--brass)" strokeWidth="0.8" opacity="0.4" />
              <line x1="40" y1="55" x2="70" y2="50" stroke="var(--gold)" strokeWidth="1" opacity="0.6" />
              <line x1="70" y1="50" x2="100" y2="45" stroke="var(--gold)" strokeWidth="1" opacity="0.6" />
              <line x1="40" y1="55" x2="25" y2="90" stroke="var(--brass)" strokeWidth="0.8" opacity="0.4" />
              <line x1="100" y1="45" x2="115" y2="85" stroke="var(--brass)" strokeWidth="0.8" opacity="0.4" />

              {/* Stars */}
              {footerStars.map((s) => {
                const isActive = activeStar === s.id;
                return (
                  <circle
                    key={s.id}
                    cx={s.cx}
                    cy={s.cy}
                    r={isActive ? 4 : 2.5}
                    fill={isActive ? '#ffffff' : 'var(--gold)'}
                    stroke="var(--brass)"
                    strokeWidth="0.8"
                    onMouseEnter={() => setActiveStar(s.id)}
                    onMouseLeave={() => setActiveStar(null)}
                    style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                  />
                );
              })}
            </svg>

            <span className="obs-constellation-plate-caption">
              {activeStar
                ? footerStars.find((s) => s.id === activeStar)?.lore
                : 'Hover stars to calibrate coordinates'}
            </span>
          </div>

          <div className="obs-footer-socials">
            <a
              href={socials.github.url}
              target="_blank"
              rel="noreferrer"
              className="obs-social-link"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>

            {socials.linkedin && (
              <a
                href={socials.linkedin.url}
                target="_blank"
                rel="noreferrer"
                className="obs-social-link"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn</span>
              </a>
            )}

            {socials.facebook && (
              <a
                href={socials.facebook.url}
                target="_blank"
                rel="noreferrer"
                className="obs-social-link"
                aria-label="Facebook Profile"
              >
                <FacebookIcon size={16} />
                <span>Facebook</span>
              </a>
            )}

            <a
              href={`mailto:${personal.email}`}
              className="obs-social-link"
              aria-label="Direct Dispatch"
            >
              <Mail size={16} />
              <span>Dispatch</span>
            </a>
          </div>
        </div>

        <div className="obs-footer-bottom">
          <p>&copy; {new Date().getFullYear()} Andrei Besañez. All manuscripts & code preserved.</p>
          <span className="obs-footer-quote">
            "Every pixel is an observation, every function a calibrated lens."
          </span>
        </div>
      </div>
    </footer>
  );
};
