import React from 'react';
import { Hero } from './Hero';
import { About } from './About';
import { Experience } from './Experience';
import { Projects } from './Projects';
import { Skills } from './Skills';
import { Certificates } from './Certificates';
import { Contact } from './Contact';
import { Gear } from './Gear';
import { VisitorChat } from './VisitorChat';

export const HomeStudio: React.FC = () => {
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-studio-stream">
      {/* 1. Hero with Mascot & Desk */}
      <Hero onNavigateSection={handleNavigateSection} />

      {/* 2. About Me with Bio & GitHub Heatmap */}
      <About onNavigateSection={handleNavigateSection} />

      {/* 3. Experience & Capstone Leadership */}
      <Experience />

      {/* 4. Projects Folio & Interactive Details */}
      <Projects />

      {/* 5. Skills & Instruments */}
      <Skills />

      {/* 6. Certificates & Verified Credentials */}
      <Certificates />

      {/* 7. Contact & Direct Message Dispatch */}
      <Contact />

      {/* 8. Gear & Studio Setup */}
      <Gear />

      {/* 9. Visitor Chat & Community Notes */}
      <VisitorChat />
    </div>
  );
};
