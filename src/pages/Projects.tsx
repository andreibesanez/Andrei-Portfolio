import React, { useEffect, useRef, useState } from 'react';
import { Mail, Compass, ChevronLeft, ChevronRight, Layers, Sparkles, Terminal } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectDossierModal } from '../components/ProjectDossierModal';
import { DiscoveryMarker } from '../components/DiscoveryMarker';
import { ProjectItem } from '../types/portfolio';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  const [filter, setFilter] = useState<string>('all');
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const { projects } = portfolioData;

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'web') return p.tags.includes('React') || p.category?.toLowerCase().includes('web');
    if (filter === 'blockchain') return p.tags.includes('Blockchain') || p.tags.includes('Smart Contracts');
    if (filter === 'systems') return p.tags.includes('CLI Tool') || p.tags.includes('Relational Database');
    return true;
  });

  // Smooth next/prev card navigation
  const handleGlide = (direction: 'next' | 'prev') => {
    const isDesktop = window.innerWidth >= 768;

    if (isDesktop && scrollTriggerInstanceRef.current) {
      const st = scrollTriggerInstanceRef.current;
      const totalCards = filteredProjects.length;
      if (totalCards <= 1) return;

      let nextIndex = direction === 'next' ? activeCardIndex + 1 : activeCardIndex - 1;
      if (nextIndex < 0) nextIndex = 0;
      if (nextIndex >= totalCards) nextIndex = totalCards - 1;

      const targetProgress = nextIndex / (totalCards - 1);
      const targetScroll = st.start + targetProgress * (st.end - st.start);

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    } else if (trackRef.current) {
      const cardWidth = 320;
      trackRef.current.scrollBy({
        left: direction === 'next' ? cardWidth : -cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // Keyboard navigation for project track
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA'].includes(tag) || selectedProject) return;

      if (e.key === 'ArrowRight') {
        handleGlide('next');
      } else if (e.key === 'ArrowLeft') {
        handleGlide('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCardIndex, filteredProjects.length, selectedProject]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet (> 768px): Pinned Horizontal Scrolling with Zoom In / Zoom Out
      mm.add('(min-width: 768px)', () => {
        const track = trackRef.current;
        const container = containerRef.current;
        if (!track || !container) return;

        const getContentWidth = () => container.clientWidth;
        const getScrollDistance = () =>
          Math.max(0, track.scrollWidth - getContentWidth());

        const topOffset = window.innerWidth >= 1024 ? 0 : 55;
        container.style.height = `calc(100vh - ${topOffset}px)`;

        const tl = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: `top top+=${topOffset}`,
            end: () => `+=${getScrollDistance() + 200}`,
            pin: true,
            pinSpacing: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
              const totalCards = filteredProjects.length;
              const idx = Math.min(
                totalCards - 1,
                Math.max(0, Math.floor(self.progress * totalCards))
              );
              setActiveCardIndex(idx);
            },
            onLeave: () => {
              container.style.height = '';
            },
            onLeaveBack: () => {
              container.style.height = '';
            },
            onEnter: () => {
              container.style.height = `calc(100vh - ${topOffset}px)`;
            },
            onEnterBack: () => {
              container.style.height = `calc(100vh - ${topOffset}px)`;
            }
          }
        });

        scrollTriggerInstanceRef.current = tl.scrollTrigger || null;

        const slides = gsap.utils.toArray<HTMLElement>('.obs-project-slide', container);
        slides.forEach((slide) => {
          gsap.fromTo(
            slide,
            { scale: 0.92, opacity: 0.75 },
            {
              scale: 1.04,
              opacity: 1,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: slide,
                containerAnimation: tl,
                start: 'left 75%',
                end: 'right 25%',
                scrub: true
              }
            }
          );
        });
      });

      // Mobile (< 768px): Staggered entrance for swipe cards
      mm.add('(max-width: 767px)', () => {
        gsap.from('.obs-project-slide', {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 85%'
          }
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      scrollTriggerInstanceRef.current = null;
    };
  }, [filter, filteredProjects.length]);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="projects" ref={containerRef} className="obs-projects-chamber">
      {/* Section Header */}
      <div className="obs-projects-header-wrap">
        <div className="obs-section-header" style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div className="obs-catalog-tag">
              <Compass size={13} color="var(--brass)" />
              <span>Section IV • The Project Folio</span>
            </div>
            {/* Celestial Discovery Marker 4 */}
            <DiscoveryMarker id="obs-folio-04" label="Audit Seal" />
          </div>

          <h2 className="obs-section-title">Selected Works & Practical Projects</h2>
          <p className="obs-section-subtitle">
            A catalogue of software applications, decentralized architectures, and interactive instruments gliding across the scholar's desk.
          </p>
        </div>

        {/* Observatory Control Bar: Category Filters & Needle Tracker */}
        <div className="obs-folio-control-bar">
          <div className="obs-folio-filter-pills">
            <button
              onClick={() => setFilter('all')}
              className={`obs-filter-pill ${filter === 'all' ? 'active' : ''}`}
            >
              <Layers size={13} />
              <span>All Folios ({projects.length})</span>
            </button>
            <button
              onClick={() => setFilter('web')}
              className={`obs-filter-pill ${filter === 'web' ? 'active' : ''}`}
            >
              <Sparkles size={13} />
              <span>Web & Full-Stack</span>
            </button>
            <button
              onClick={() => setFilter('blockchain')}
              className={`obs-filter-pill ${filter === 'blockchain' ? 'active' : ''}`}
            >
              <Compass size={13} />
              <span>Blockchain & Web3</span>
            </button>
            <button
              onClick={() => setFilter('systems')}
              className={`obs-filter-pill ${filter === 'systems' ? 'active' : ''}`}
            >
              <Terminal size={13} />
              <span>Systems & CLI</span>
            </button>
          </div>

          {/* Instrument Progress Gauge */}
          <div className="obs-folio-gauge-wrap">
            <div className="obs-folio-index-label">
              <span>FOLIO RECORD {String(activeCardIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}</span>
            </div>

            <div className="obs-folio-gauge-rail">
              <div
                className="obs-folio-gauge-needle"
                style={{ width: `${Math.max(15, Math.round(scrollProgress * 100))}%` }}
              />
            </div>

            <div className="obs-folio-glide-controls">
              <button
                onClick={() => handleGlide('prev')}
                className="obs-glide-btn"
                title="Glide to Previous Folio (or press Left Arrow)"
                aria-label="Previous Project Folio"
                disabled={activeCardIndex === 0}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => handleGlide('next')}
                className="obs-glide-btn"
                title="Glide to Next Folio (or press Right Arrow)"
                aria-label="Next Project Folio"
                disabled={activeCardIndex >= filteredProjects.length - 1}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Gliding Track */}
      <div className="obs-projects-track-viewport">
        <div ref={trackRef} className="obs-projects-track">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.title}
              className={`obs-project-slide ${idx === activeCardIndex ? 'focused' : ''}`}
            >
              <ProjectCard project={project} onOpenDossier={(p) => setSelectedProject(p)} />
            </div>
          ))}

          {/* Final Callout Slide inside the horizontal sequence */}
          <div className="obs-project-slide obs-collab-slide">
            <div className="obs-projects-collab-plaque">
              {/* Corner Brackets */}
              <div className="obs-card-bracket-tl" />
              <div className="obs-card-bracket-tr" />
              <div className="obs-card-bracket-bl" />
              <div className="obs-card-bracket-br" />

              <div className="obs-collab-text-wrap">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Compass size={16} color="var(--brass)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', color: 'var(--brass)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    COLLABORATIVE INQUIRY
                  </span>
                </div>
                <h3 className="obs-collab-title">Have an ambitious project in mind?</h3>
                <p className="obs-collab-desc">
                  I am always eager to collaborate on innovative web applications, design systems, or engineering apprenticeships. Let us build something memorable together.
                </p>
              </div>

              <button onClick={scrollToContact} className="btn-brass-primary">
                <span>Begin Correspondence</span>
                <Mail size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Archival Dossier Modal */}
      <ProjectDossierModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
