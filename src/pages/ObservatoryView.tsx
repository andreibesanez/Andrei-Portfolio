import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home } from './Home';
import { About } from './About';
import { Skills } from './Skills';
import { Projects } from './Projects';
import { Experience } from './Experience';
import { Contact } from './Contact';

gsap.registerPlugin(ScrollTrigger);

export const ObservatoryView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // After all sections mount and the sidebar has shifted the layout,
    // give the browser one paint tick then refresh all ScrollTrigger instances
    // so their trigger offsets are measured correctly.
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 200);

    const ctx = gsap.context(() => {
      const dividers = gsap.utils.toArray<HTMLElement>('.obs-divider-rule');
      dividers.forEach((div) => {
        const star = div.querySelector('span');
        if (star) {
          gsap.from(star, {
            scale: 0.4,
            rotation: -60,
            opacity: 0,
            duration: 0.9,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: div,
              start: 'top 90%'
            }
          });
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <Home />

      <div className="obs-divider-rule">
        <span>✦ • ✦ • ✦</span>
      </div>

      <About />

      <div className="obs-divider-rule">
        <span>✦ • ✦ • ✦</span>
      </div>

      <Skills />

      <div className="obs-divider-rule">
        <span>✦ • ✦ • ✦</span>
      </div>

      <Projects />

      <div className="obs-divider-rule">
        <span>✦ • ✦ • ✦</span>
      </div>

      <Experience />

      <div className="obs-divider-rule">
        <span>✦ • ✦ • ✦</span>
      </div>

      <Contact />
    </div>
  );
};
