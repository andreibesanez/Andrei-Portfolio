import React, { useRef, useEffect } from 'react';
import { User, GraduationCap, MapPin, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';
import { GithubHeatmap } from '../components/GithubHeatmap';
import { portfolioData } from '../data/portfolioData';
import './About.css';

gsap.registerPlugin(Draggable, InertiaPlugin, Flip, Observer);

interface AboutProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const About: React.FC<AboutProps> = () => {
  const { personal, socials } = portfolioData;

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isEnlargedRef = useRef(false);

  useEffect(() => {
    const imgEl = imageRef.current;
    const contEl = containerRef.current;
    if (!imgEl || !contEl) return;

    // 1. DRAGGABLE & INERTIA: Make Andrei's cut-out avatar tossable with momentum
    const dragInstance = Draggable.create(imgEl, {
      type: 'x,y',
      bounds: contEl,
      edgeResistance: 0.65,
      inertia: true,
      cursor: 'grab',
      activeCursor: 'grabbing',
      onDrag: function () {
        // Dynamic tilt based on drag velocity
        const vx = InertiaPlugin.getVelocity(this.target, 'x') || 0;
        gsap.to(this.target, {
          rotation: vx * 0.02,
          scale: 1.05,
          duration: 0.15,
          overwrite: 'auto',
        });
      },
      onRelease: function () {
        // Smooth snap back towards home coordinates with playful bounce
        gsap.to(this.target, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.85,
          ease: 'elastic.out(1, 0.45)',
        });
      },
    });

    // 2. GSAP OBSERVER: 3D interactive tilt & spotlight illumination on pointer move
    const observer = Observer.create({
      target: contEl,
      type: 'pointer',
      onMove: (self) => {
        if (dragInstance[0]?.isDragging) return;
        const rect = contEl.getBoundingClientRect();
        const pointerX = self.x ?? (self.event as PointerEvent)?.clientX ?? rect.left + rect.width / 2;
        const pointerY = self.y ?? (self.event as PointerEvent)?.clientY ?? rect.top + rect.height / 2;
        
        // Calculate normalized coordinate (-1 to 1)
        const relX = (pointerX - rect.left) / rect.width - 0.5;
        const relY = (pointerY - rect.top) / rect.height - 0.5;

        gsap.to(imgEl, {
          rotationY: relX * 24, // 3D tilt Y
          rotationX: -relY * 20, // 3D tilt X
          transformPerspective: 800,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      },
      onHoverEnd: () => {
        if (dragInstance[0]?.isDragging) return;
        gsap.to(imgEl, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
      },
    });

    return () => {
      dragInstance[0]?.kill();
      observer.kill();
    };
  }, []);

  // 3. GSAP FLIP: Smooth morph / zoom toggle upon clicking avatar
  const handleAvatarClick = () => {
    const imgEl = imageRef.current;
    if (!imgEl) return;

    // Capture state before layout change
    const state = Flip.getState(imgEl);

    // Toggle enlarged state class
    isEnlargedRef.current = !isEnlargedRef.current;
    if (isEnlargedRef.current) {
      imgEl.classList.add('avatar-enlarged');
    } else {
      imgEl.classList.remove('avatar-enlarged');
    }

    // Animate via GSAP Flip
    Flip.from(state, {
      duration: 0.65,
      ease: 'back.out(1.5)',
      scale: true,
    });
  };

  return (
    <section id="about" className="workspace-section">
      <div className="workspace-content-container">
        
        {/* Section Header */}
        <div className="section-head-row">
          <div className="section-tag">
            <User size={13} />
            <span>About Me</span>
          </div>

          <a
            href={personal.resume_link}
            onClick={(e) => {
              if (personal.resume_link === '#') {
                e.preventDefault();
                alert('Andrei’s formal resume PDF will be available upon verified recruiter request. Feel free to reach out via Contact!');
              }
            }}
            className="about-resume-btn"
          >
            <span>View Resume</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Card Layout: Bio + Avatar + Credentials */}
        <div className="about-main-card" data-speed="clamp(1.05)">
          <div className="about-grid">
            
            {/* Left Column: Author Narrative */}
            <div className="about-narrative-col" data-lag="0.1">
              <h2 className="about-greeting-title">
                Building thoughtful digital experiences from Digos City to the global web.
              </h2>
              
              <div className="about-paragraphs">
                <p>
                  I am an Information Technology scholar and developer based in the Philippines, 
                  pursuing my degree at <strong>Cor Jesu College</strong>. My journey into technology 
                  is fueled by a passion for transforming intricate system requirements into clean, 
                  accessible, and enjoyable digital tools.
                </p>
                <p>
                  I enjoy working across modern frontend architecture (React, TypeScript, GSAP) 
                  and robust backends (PHP/Laravel, Node.js, relational PostgreSQL/MySQL schemas). 
                  Outside the screen, I explore astronomy, classical instrument mechanics, and system design literature.
                </p>
              </div>

              {/* Status Chips */}
              <div className="about-meta-chips">
                <div className="status-chip open-work">
                  <span className="pulsing-green-dot" />
                  <span>Open to apprentice & freelance roles</span>
                </div>
                <div className="status-chip education-chip">
                  <GraduationCap size={14} className="chip-icon" />
                  <span>BS Information Technology (2023 – Present)</span>
                </div>
                <div className="status-chip location-chip">
                  <MapPin size={14} className="chip-icon" />
                  <span>Digos City, Davao del Sur</span>
                </div>
              </div>
            </div>

            {/* Right Column: Borderless Backgroundless Interactive Avatar + Education Card */}
            <div className="about-profile-col" data-lag="0.2">
              <div
                ref={containerRef}
                className="about-photo-wrapper borderless-transparent"
                title="Interactive Avatar: Hover for 3D tilt, Click to FLIP zoom, Drag & Toss with Inertia!"
              >
                <div className="avatar-ambient-glow" />
                <img
                  ref={imageRef}
                  src={personal.avatar}
                  alt={personal.name}
                  className="about-avatar-img transparent-cutout"
                  onClick={handleAvatarClick}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="avatar-interactive-hint">✨ interactive</span>
              </div>

              <div className="about-school-card">
                <div className="school-header">
                  <img
                    src={personal.education.logo}
                    alt={personal.education.school}
                    className="school-logo-img"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div>
                    <h4 className="school-name">{personal.education.school}</h4>
                    <span className="school-batch">{personal.education.degree}</span>
                  </div>
                </div>
                <p className="school-detail">
                  Focused on software engineering, database design, user interface architectures, and distributed systems.
                </p>
              </div>
            </div>

          </div>

          {/* Authentic GitHub Contribution Graph */}
          <GithubHeatmap username={socials.github.username} />
        </div>

      </div>
    </section>
  );
};
