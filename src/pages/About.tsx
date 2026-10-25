import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Compass } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';
import { DiscoveryMarker } from '../components/DiscoveryMarker';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

interface InquiryDomain {
  id: string;
  roman: string;
  symbol: string;
  title: string;
  tag: string;
  summary: string;
  deepDive: string;
}

const INQUIRY_DOMAINS: InquiryDomain[] = [
  {
    id: 'interface',
    roman: 'I.',
    symbol: '✦',
    title: 'Interface Craftsmanship',
    tag: 'Design Tokens & Responsiveness',
    summary: 'Balancing classical typographic discipline with responsive modern CSS architecture.',
    deepDive: 'I build user interfaces using custom CSS variables, semantic HTML, and fluid layouts. Every screen is designed as an accessible document where visual hierarchy and text legibility serve human readers first.'
  },
  {
    id: 'relational',
    roman: 'II.',
    symbol: '✧',
    title: 'Relational & Backend Data',
    tag: 'Database Architecture & APIs',
    summary: 'Structuring normalized database schemas and reliable RESTful API communication.',
    deepDive: 'Focusing on clean schema design across MySQL, SQLite, and PostgreSQL. From building full-stack guestbook APIs in Express to writing controllers in Laravel, I prioritize data integrity and straightforward CRUD endpoints.'
  },
  {
    id: 'blockchain',
    roman: 'III.',
    symbol: '✣',
    title: 'Decentralized Auditability',
    tag: 'Public Ledgers & Smart Contracts',
    summary: 'Exploring blockchain technology to solve real institutional transparency challenges in the Philippines.',
    deepDive: 'Through capstone work on Chainbudget and hackathon prototyping with 4Ps-Nexus on Stellar Soroban, I explore how immutable distributed ledgers can provide verifiable, tamper-proof auditing for student and public funds.'
  },
  {
    id: 'documentation',
    roman: 'IV.',
    symbol: '❂',
    title: 'System Documentation as Craft',
    tag: 'Blueprints & Technical Writing',
    summary: 'Authoring architectural blueprints, user manuals, and technical research chapters.',
    deepDive: 'Serving as the Documentation Specialist for our capstone instilled a deep respect for clear system manuals. Writing precise technical documentation ensures systems outlive their initial sprint cycles and remain maintainable.'
  }
];

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDomain, setSelectedDomain] = useState<string>('interface');
  const { personal } = portfolioData;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance animation triggered on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%'
        }
      });

      tl.from('.obs-about-manuscript', {
        x: -80,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      }, 0);

      tl.from('.obs-inquiry-domain-card', {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out'
      }, 0.2);

      tl.from('.obs-about-display-col', {
        x: 80,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      }, 0.1);

      tl.from('.obs-academy-logo-wrap', {
        scale: 0.7,
        rotation: -15,
        opacity: 0,
        duration: 0.7,
        ease: 'back.out(1.7)'
      }, 0.3);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="obs-about-chamber">
      <div className="obs-section-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div className="obs-catalog-tag">Section II • The Scholar's Study</div>
          {/* Celestial Discovery Marker 2 */}
          <DiscoveryMarker id="obs-study-02" label="Study Seal" />
        </div>

        <h2 className="obs-section-title">Academic & Technical Inquiry</h2>
        <p className="obs-section-subtitle">
          An exploration into modern software engineering grounded in discipline, curiosity, and interface craftsmanship.
        </p>
      </div>

      <div className="obs-about-grid">
        {/* Left Column: Biography & Interactive Scholarly Tenets */}
        <div className="obs-about-manuscript">
          <div className="obs-about-bio-text">
            <p>{personal.about.p1}</p>
            <p>{personal.about.p2}</p>
          </div>

          <div className="obs-inquiry-domains-section">
            <div className="obs-domains-caption">
              <Compass size={13} color="var(--brass)" />
              <span>CORE DISCIPLINES OF STUDY • CLICK TO EXAMINE</span>
            </div>

            <div className="obs-inquiry-domains-list">
              {INQUIRY_DOMAINS.map((domain) => {
                const isSelected = selectedDomain === domain.id;

                return (
                  <div
                    key={domain.id}
                    onClick={() => setSelectedDomain(domain.id)}
                    className={`obs-inquiry-domain-card ${isSelected ? 'active' : ''}`}
                    tabIndex={0}
                    role="button"
                    aria-expanded={isSelected}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedDomain(domain.id);
                      }
                    }}
                  >
                    <div className="obs-domain-header">
                      <div className="obs-domain-left">
                        <span className="obs-domain-roman">{domain.roman}</span>
                        <h3 className="obs-domain-title">{domain.title}</h3>
                      </div>
                      <span className="obs-domain-tag">{domain.tag}</span>
                    </div>

                    <p className="obs-domain-summary">{domain.summary}</p>

                    {isSelected && (
                      <div className="obs-domain-deep-dive">
                        <div className="obs-domain-divider" />
                        <p>{domain.deepDive}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Academy Seal & Location Plaque */}
        <div className="obs-about-display-col">
          <div className="obs-academy-card">
            {/* Corner Brackets */}
            <div className="obs-card-bracket-tl" />
            <div className="obs-card-bracket-tr" />
            <div className="obs-card-bracket-bl" />
            <div className="obs-card-bracket-br" />

            <div className="obs-academy-header">
              <div className="obs-academy-logo-wrap">
                <img
                  src={personal.education.logo}
                  alt={personal.education.school}
                  className="obs-academy-logo"
                />
              </div>
              <div>
                <h3 className="obs-academy-degree">{personal.education.degree}</h3>
                <span className="obs-academy-school">
                  {personal.education.school} • {personal.education.year}
                </span>
              </div>
            </div>

            <div className="obs-academy-details">
              <p style={{ marginBottom: '0.85rem' }}>{personal.education.description_p1}</p>
              <p>{personal.education.description_p2}</p>
            </div>
          </div>

          <div className="obs-location-plaque">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={15} color="var(--brass)" />
              <span>STATION: DIGOS CITY, PH</span>
            </div>
            <span>06°44' N, 125°21' E</span>
          </div>
        </div>
      </div>
    </section>
  );
};
