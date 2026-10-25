import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Compass,
  User,
  Code,
  Layers,
  History,
  Mail,
  Download,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';
import { ResumeModal } from './ResumeModal';
import { useDiscovery } from '../context/DiscoveryContext';
import './ObservatoryNav.css';

export const ObservatoryNav: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const { discoveredCount, totalCount, setIsJournalOpen } = useDiscovery();
  const location = useLocation();
  const navigate = useNavigate();
  const scrollTimeoutRef = useRef<number | null>(null);

  // Close drawer on route change
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location]);

  // High-Precision Active Section ScrollSpy
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];

    const handleScroll = () => {
      if (scrollTimeoutRef.current) return;

      scrollTimeoutRef.current = window.setTimeout(() => {
        scrollTimeoutRef.current = null;
        const scrollPosition = window.scrollY + 200;

        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el) {
            const top = el.offsetTop;
            if (scrollPosition >= top) {
              setActiveSection(sectionIds[i]);
              break;
            }
          }
        }
      }, 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [location.pathname]);

  // Safe & Gentle Theme Toggle (No Flashes, Accessible)
  const toggleTheme = () => {
    const nextIsDark = !document.documentElement.classList.contains('dark');
    if (nextIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setIsDark(nextIsDark);
  };

  // Safe & Smooth Navigation (Clean, Accessible)
  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    if (location.pathname !== '/') {
      navigate('/#' + id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setActiveSection(id);
    setIsDrawerOpen(false);
  };

  const { personal, socials } = portfolioData;

  const navItems = [
    { id: 'hero', label: 'Intro & Zenith', roman: 'I.', icon: Compass, context: 'Zenith & Celestial Log' },
    { id: 'about', label: 'Scholar’s Study', roman: 'II.', icon: User, context: 'Biography & Scholarly Tenets' },
    { id: 'skills', label: 'Instruments', roman: 'III.', icon: Code, context: 'Proficiencies & Technical Arsenal' },
    { id: 'projects', label: 'Project Folio', roman: 'IV.', icon: Layers, context: 'Selected Works & Ledgers' },
    { id: 'experience', label: 'Chronicle', roman: 'V.', icon: History, context: 'Historical Records & Timeline' },
    { id: 'contact', label: 'The Dispatch', roman: 'VI.', icon: Mail, context: 'Direct Scholarly Dispatch' }
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <header className="obs-mobile-header">
        <NavLink to="/" className="obs-mobile-brand" onClick={(e) => handleNavClick(e, 'hero')}>
          <div className="obs-crest">
            <span>{personal.initials}</span>
          </div>
          <div className="obs-mobile-brand-meta">
            <span className="obs-brand-name">{personal.name}</span>
            <span className="obs-brand-badge">The Classical Observatory</span>
          </div>
        </NavLink>

        <div className="obs-mobile-actions">
          <button
            className="obs-icon-btn"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to Parchment Day Study' : 'Switch to Midnight Sky Observatory'}
            title={isDark ? 'Parchment Study Mode' : 'Midnight Sky Mode'}
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            className="obs-icon-btn"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open Observatory Navigation"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`obs-sidebar-backdrop ${isDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Main Persistent Side Navigation */}
      <aside className={`obs-sidebar ${isDrawerOpen ? 'open' : ''}`} aria-label="Observatory Side Navigation">
        {/* Mobile Close Button */}
        <button
          className="obs-sidebar-close-btn"
          onClick={() => setIsDrawerOpen(false)}
          aria-label="Close Navigation"
        >
          <X size={18} />
        </button>

        {/* Brand / Observatory Seal */}
        <div className="obs-sidebar-header">
          <NavLink to="/" className="obs-sidebar-brand" onClick={(e) => handleNavClick(e, 'hero')}>
            <div className="obs-sidebar-crest">
              <span className="obs-initials">{personal.initials}</span>
              <div className="obs-crest-orbit" />
            </div>

            <div className="obs-sidebar-brand-text">
              <h1 className="obs-scholar-name">{personal.name}</h1>
              <span className="obs-scholar-role">{personal.role}</span>
            </div>
          </NavLink>

          <div className="obs-sidebar-coords-pill">
            <span className="obs-pulse-dot" />
            <span>06°44' N, 125°21' E • DIGOS CITY</span>
          </div>
        </div>

        {/* Section Navigation Links */}
        <nav className="obs-sidebar-nav">
          <div className="obs-nav-caption">
            <span>OBSERVATORY CATALOG</span>
            <span className="obs-nav-caption-line" />
          </div>

          <div className="obs-nav-items-list">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`obs-sidebar-link ${isActive ? 'active' : ''}`}
                  title={`${item.label} — ${item.context}`}
                >
                  {/* Left Active Needle Indicator */}
                  <div className="obs-link-bracket" />

                  <span className="obs-link-roman">{item.roman}</span>
                  <div className="obs-link-icon-wrap">
                    <IconComponent size={15} />
                  </div>

                  <div className="obs-link-text-block">
                    <span className="obs-link-label">{item.label}</span>
                    <span className="obs-link-context">{item.context}</span>
                  </div>

                  <ChevronRight size={13} className="obs-link-arrow" />
                </a>
              );
            })}
          </div>
        </nav>

        {/* Field Journal Quick Pill */}
        <div className="obs-sidebar-journal-block">
          <button
            onClick={() => setIsJournalOpen(true)}
            className="obs-sidebar-journal-pill"
            title="Open Field Observations Journal"
          >
            <BookOpen size={13} color="var(--brass)" />
            <span className="obs-journal-pill-text">Journal Discoveries</span>
            <span className="obs-journal-pill-count">{discoveredCount}/{totalCount}</span>
          </button>
        </div>

        {/* Bottom Panel: Connect, Resume & Mode */}
        <div className="obs-sidebar-footer">
          {/* Social Connections */}
          <div className="obs-sidebar-connect-row">
            <span className="obs-connect-tag">CONNECT</span>
            <div className="obs-connect-icons">
              <a
                href={socials.github.url}
                target="_blank"
                rel="noreferrer"
                className="obs-social-icon-btn"
                title="GitHub Preserved Repository"
                aria-label="GitHub Repository"
              >
                <GithubIcon size={15} />
              </a>

              {socials.linkedin && (
                <a
                  href={socials.linkedin.url}
                  target="_blank"
                  rel="noreferrer"
                  className="obs-social-icon-btn"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={15} />
                </a>
              )}

              {socials.facebook && (
                <a
                  href={socials.facebook.url}
                  target="_blank"
                  rel="noreferrer"
                  className="obs-social-icon-btn"
                  title="Facebook Dispatch"
                  aria-label="Facebook Profile"
                >
                  <FacebookIcon size={15} />
                </a>
              )}
            </div>
          </div>

          {/* Action Row: Resume & Theme */}
          <div className="obs-sidebar-actions-row">
            <button
              onClick={() => setIsResumeOpen(true)}
              className="obs-btn-resume"
              title="Inspect Academic & Technical Curriculum Vitae"
            >
              <Download size={13} />
              <span>Curriculum Vitae</span>
            </button>

            <button
              onClick={toggleTheme}
              className="obs-theme-toggle-btn"
              title={isDark ? 'Switch to Parchment Day Study' : 'Switch to Midnight Sky Observatory'}
              aria-label={isDark ? 'Switch to Parchment Day Study' : 'Switch to Midnight Sky Observatory'}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>
      </aside>

      {/* Curriculum Vitae Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
};
