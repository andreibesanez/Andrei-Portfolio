import React, { useEffect, useRef, useState } from 'react';
import { Compass, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';
import { DiscoveryMarker } from '../components/DiscoveryMarker';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0]); // First expanded by default
  const { experience } = portfolioData;

  const toggleExpand = (idx: number) => {
    setExpandedIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Timeline axis draws down as you scroll
      gsap.fromTo(
        '.obs-chronicle-axis',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: '.obs-chronicle-timeline',
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: 1.2
          }
        }
      );

      // 2. Animate each entry independently with alternating directions
      const entries = gsap.utils.toArray<HTMLElement>('.obs-chronicle-entry');
      entries.forEach((entry) => {
        const isOdd = entry.classList.contains('reverse');
        const fromX = isOdd ? 80 : -80;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });

        tl.from(entry, {
          x: fromX,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out'
        });

        tl.from(
          entry.querySelector('.obs-chronicle-node'),
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'back.out(2)'
          },
          '-=0.5'
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getStatusBadge = (duration: string) => {
    if (duration.includes('Present')) {
      return { label: 'ACTIVE ENDEAVOR', isCurrent: true };
    }
    return { label: 'VERIFIED MILESTONE', isCurrent: false };
  };

  return (
    <section id="experience" ref={containerRef} className="obs-exp-chamber">
      <div className="obs-section-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div className="obs-catalog-tag">
            <Compass size={13} color="var(--brass)" />
            <span>Section V • The Chronicle</span>
          </div>
          {/* Celestial Discovery Marker 5 */}
          <DiscoveryMarker id="obs-chronicle-05" label="Chronicle Seal" />
        </div>

        <h2 className="obs-section-title">Milestones & Historical Record</h2>
        <p className="obs-section-subtitle">
          A continuous record of engineering engagements, academic capstone documentation, and real-world system implementations.
        </p>
      </div>

      <div className="obs-chronicle-timeline">
        <div className="obs-chronicle-axis" />

        {experience.map((item, idx) => {
          const isExpanded = expandedIndices.includes(idx);
          const status = getStatusBadge(item.duration);

          return (
            <div
              key={item.title + item.duration}
              className={`obs-chronicle-entry ${idx % 2 !== 0 ? 'reverse' : ''}`}
            >
              {/* Center Node */}
              <div className="obs-chronicle-node">
                <div className="obs-chronicle-node-inner" />
              </div>

              {/* Meta: Title, Organization, Dates */}
              <div className="obs-chronicle-meta">
                <span className={`obs-chronicle-status-badge ${status.isCurrent ? 'current' : 'completed'}`}>
                  {status.label}
                </span>
                <h3 className="obs-chronicle-role">{item.title}</h3>
                <span className="obs-chronicle-org">{item.company}</span>
                <span className="obs-chronicle-dates">{item.duration}</span>
              </div>

              {/* Content Card with Interactive Expand */}
              <div className="obs-chronicle-card-wrap">
                <div className="obs-chronicle-card">
                  {/* Corner Brackets */}
                  <div className="obs-card-bracket-tl" />
                  <div className="obs-card-bracket-tr" />
                  <div className="obs-card-bracket-bl" />
                  <div className="obs-card-bracket-br" />

                  <p className="obs-chronicle-desc">{item.description}</p>

                  {/* Toggle Button for Details */}
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="obs-chronicle-expand-btn"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? 'Conceal Key Deliverables' : 'Examine Key Deliverables'}</span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>

                  {isExpanded && (
                    <div className="obs-chronicle-deliverables-panel">
                      <ul className="obs-chronicle-bullet-points">
                        {item.points.map((pt, i) => (
                          <li key={i} className="obs-chronicle-pt">
                            <CheckCircle2 size={13} color="var(--brass)" style={{ flexShrink: 0, marginTop: '3px' }} />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="obs-chronicle-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="obs-chronicle-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
