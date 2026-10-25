import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';
import './CompassReturn.css';

export const CompassReturn: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToZenith = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`obs-compass-return ${visible ? 'visible' : ''}`}
      onClick={scrollToZenith}
      aria-label="Return to Observatory Zenith"
      title="Ascend to Observatory Zenith"
    >
      <Compass size={22} strokeWidth={1.5} />
    </button>
  );
};
