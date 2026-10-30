import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from './Hero';
import { About } from './About';
import { Projects } from './Projects';
import { Skills } from './Skills';
import { Experience } from './Experience';
import { Contact } from './Contact';

gsap.registerPlugin(ScrollTrigger);

export const ObservatoryView: React.FC = () => {
  useEffect(() => {
    // Refresh ScrollTrigger instances once mounted
    const timer = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  const handleNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="portfolio-content-stream">
      <Hero onNavigateSection={handleNav} />
      <About onNavigateSection={handleNav} />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </div>
  );
};
