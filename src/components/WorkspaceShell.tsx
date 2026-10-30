import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Observer } from 'gsap/Observer';
import { SidebarDock } from './SidebarDock';
import { MusicWidget } from './MusicWidget';
import { ThemeToggle } from './ThemeToggle';
import './WorkspaceShell.css';

// Register all core GSAP navigation and scroll plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer);

interface WorkspaceShellProps {
  children: React.ReactNode;
}

export const WorkspaceShell: React.FC<WorkspaceShellProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      // 1. CREATE SCROLLSMOOTHER
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.2,
        effects: true,
        smoothTouch: 0.15,
        normalizeScroll: false,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          const vel = Math.round(self.getVelocity());
          setScrollVelocity(vel);
          if (self.scrollTrigger) {
            if (self.scrollTrigger.direction === 1) {
              setScrollDirection('down');
            } else if (self.scrollTrigger.direction === -1) {
              setScrollDirection('up');
            }
          }
        },
      });

      smootherRef.current = smoother;

      // 2. PARALLAX & LAG EFFECTS APPLIED THROUGH SCROLLSMOOTHER
      smoother.effects('.section-tag', { speed: 1.08, lag: 0.05 });
      smoother.effects('.section-title', { speed: 1.05 });
      smoother.effects('.skill-category-card', { lag: 0.12 });
      smoother.effects('.cert-card', { speed: 1.03 });
      smoother.effects('.gear-item-card', { lag: 0.06 });
      smoother.effects('.chat-bubble', { lag: 0.08 });

      // 3. GSAP OBSERVER INTEGRATION: SENSES WHEEL, TOUCH, POINTER & DIRECTIONAL INTENT
      Observer.create({
        target: window,
        type: 'wheel,touch,pointer',
        tolerance: 15,
        debounce: true,
        onDown: () => {
          // User swiping / scrolling downward: hide subtle top bar clutter if needed
          document.body.classList.add('scrolling-down');
          document.body.classList.remove('scrolling-up');
        },
        onUp: () => {
          // User swiping / scrolling upward: reveal top controls immediately
          document.body.classList.add('scrolling-up');
          document.body.classList.remove('scrolling-down');
        },
        onStop: () => {
          // Re-reveal controls when gesture ceases
          document.body.classList.remove('scrolling-down');
        },
      });

      // 4. SCROLLTRIGGER BATCH ANIMATIONS
      ScrollTrigger.batch('.skill-category-card', {
        interval: 0.1,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, scale: 0.96, y: 30 },
            { opacity: 1, scale: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'back.out(1.2)' }
          );
        },
      });

      ScrollTrigger.batch('.cert-card', {
        interval: 0.1,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.65, ease: 'power2.out' }
          );
        },
      });

      ScrollTrigger.batch('.timeline-entry', {
        interval: 0.15,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, stagger: 0.2, duration: 0.8, ease: 'power2.out' }
          );
        },
      });

      // 5. SCROLLSPY LINKED WITH SCROLLTRIGGER
      const sections = [
        'hero',
        'about',
        'experience',
        'projects',
        'skills',
        'certificates',
        'contact',
        'gear',
        'visitor-chat',
      ];

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 45%',
            end: 'bottom 45%',
            onToggle: (self) => {
              if (self.isActive) {
                setActiveSection(id);
              }
            },
          });
        }
      });
    });

    return () => {
      ctx.revert();
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    if (smootherRef.current) {
      smootherRef.current.scrollTo(el, true, 'top 60px');
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="workspace-main-shell">
      {/* 1. TOP GLOBAL SCROLL PROGRESS INDICATOR */}
      <div
        className="smoother-progress-bar"
        style={{ transform: `scaleX(${scrollProgress})` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Top Left Monogram / Branding */}
      <header className="workspace-top-bar">
        <button
          onClick={() => handleNavigate('hero')}
          className="workspace-brand-monogram"
          aria-label="Back to top"
        >
          <span className="brand-dot" />
          <span className="brand-name">Andrei.</span>
        </button>

        {/* Top Right Controls: Theme Toggle + Music Widget + Professional View */}
        <div className="workspace-top-actions">
          {Math.abs(scrollVelocity) > 200 && (
            <div className="smoother-velocity-badge">
              <span>
                {scrollDirection === 'down' ? '↓' : '↑'} {Math.abs(scrollVelocity)} px/s
              </span>
            </div>
          )}

          {/* Unique Night & Light Cosmic Toggle */}
          <ThemeToggle />

          <MusicWidget />

          <Link
            to="/professional"
            className="pro-view-toggle-btn"
            title="Switch to Distraction-Free Professional Mode"
          >
            <span>view professional</span>
            <ExternalLink size={13} className="pro-arrow" />
          </Link>
        </div>
      </header>

      {/* Floating Vertical Navigation Dock (outside smoother wrapper) */}
      <SidebarDock
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* GSAP ScrollSmoother Structure */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {/* Stream of Portfolio Sections */}
          <main className="workspace-content-stream">
            {children}
          </main>

          {/* Bottom Minimalist Footer */}
          <footer className="workspace-footer">
            <p className="footer-line">
              Designed & engineered with care by <strong>Andrei Besañez</strong> • Digos City, Philippines
            </p>
            <p className="footer-sub">
              React 19 • TypeScript • GSAP Flip, Draggable, Inertia, Observer, ScrollTrigger & ScrollSmoother
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};
