import React, { useEffect, useRef, useState } from 'react';
import { Compass, ArrowRight, Mail, User, Disc } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';
import { CelestialOrb } from '../components/CelestialOrb';
import { CelestialDial } from '../components/CelestialDial';
import { DiscoveryMarker } from '../components/DiscoveryMarker';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

export const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [instrumentMode, setInstrumentMode] = useState<'portrait' | 'dial'>('portrait');
  const { personal } = portfolioData;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Stagger Entrance
      gsap.from('.obs-hero-log-entry, .obs-hero-headline, .obs-hero-intro, .obs-hero-actions, .obs-hero-status-ribbon', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out'
      });

      gsap.from('.obs-scholar-portrait-frame', {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });

      // 2. Interactive Scroll Zoom-In / Zoom-Out & Orbit Velocity (Scrub)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });

      tl.to(orbRef.current, {
        scale: 2.4,
        rotation: 140,
        opacity: 0.15,
        ease: 'power1.inOut'
      }, 0);

      tl.to('.obs-hero-manuscript', {
        x: -90,
        opacity: 0,
        ease: 'power1.in'
      }, 0);

      tl.to('.obs-scholar-portrait-frame', {
        scale: 1.15,
        y: -40,
        opacity: 0,
        ease: 'power1.in'
      }, 0);
    }, containerRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={containerRef} className="obs-hero-chamber">
      <div className="obs-hero-grid">
        {/* Left Column: Scholarly Manuscript */}
        <div className="obs-hero-manuscript">
          <div className="obs-hero-log-entry">
            <span>OBSERVATION LOG N° 2026 • DIGOS CITY, PHILIPPINES</span>
          </div>

          <h1 ref={headlineRef} className="obs-hero-headline">
            A curious mind,<br />
            <em>building for tomorrow.</em>
          </h1>

          <p className="obs-hero-intro">
            I am <strong>Andrei Besañez</strong> — an Information Technology student in the Philippines exploring modern web development, thoughtful interface design, and digital experiences that solve real-world problems.
          </p>

          <div className="obs-hero-actions">
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-brass-primary"
            >
              <span>Explore My Work</span>
              <ArrowRight size={15} />
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="btn-parchment-secondary"
            >
              <span>Contact Me</span>
              <Mail size={15} />
            </button>
          </div>

          {/* Celestial Status Ribbon */}
          <div className="obs-hero-status-ribbon">
            <div className="obs-status-item">
              <span className="obs-status-pulse" />
              <span>CURRENT STUDY: REACT 19 & GSAP</span>
            </div>
            <div className="obs-status-item">
              <Compass size={13} color="var(--brass)" />
              <span>SKY CONDITION: DISCOVERING & BUILDING</span>
            </div>
          </div>
        </div>

        {/* Right Column: Celestial Astrolabe & Scholar Frame */}
        <div className="obs-hero-instrument-col">
          {instrumentMode === 'portrait' && (
            <div ref={orbRef} className="obs-hero-orb-backdrop">
              <CelestialOrb size={460} />
            </div>
          )}

          {/* View Mode Switcher */}
          <div className="obs-hero-mode-switch">
            <button
              onClick={() => setInstrumentMode('portrait')}
              className={`obs-hero-mode-btn ${instrumentMode === 'portrait' ? 'active' : ''}`}
              title="Scholar Portrait View"
            >
              <User size={12} />
              <span>Scholar Frame</span>
            </button>
            <button
              onClick={() => setInstrumentMode('dial')}
              className={`obs-hero-mode-btn ${instrumentMode === 'dial' ? 'active' : ''}`}
              title="Interactive Astrolabe Dial"
            >
              <Disc size={12} />
              <span>Astrolabe Dial</span>
            </button>
          </div>

          {instrumentMode === 'portrait' ? (
            <div className="obs-scholar-portrait-frame">
              {/* Antique corner brackets */}
              <div className="obs-card-bracket-tl" />
              <div className="obs-card-bracket-tr" />
              <div className="obs-card-bracket-bl" />
              <div className="obs-card-bracket-br" />

              <div className="obs-portrait-inner-matte">
                <img
                  src="/images/pfp.png"
                  alt={personal.name}
                  className="obs-scholar-img"
                />
              </div>

              <div className="obs-portrait-plaque">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div className="obs-plaque-title">Andrei Besañez</div>
                    <div className="obs-plaque-coords">COR JESU COLLEGE • BSIT</div>
                  </div>
                  {/* Celestial Discovery Marker 1 */}
                  <DiscoveryMarker id="obs-zenith-01" label="Seal 01" />
                </div>
              </div>
            </div>
          ) : (
            <CelestialDial className="obs-hero-celestial-dial" />
          )}
        </div>
      </div>
    </section>
  );
};
