import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import './ThemeToggle.css';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('andrei_theme');
      if (saved) return saved === 'dark';
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('andrei_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('andrei_theme', 'light');
    }
  }, [isDark]);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. Get click coordinate for radial shockwave effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // 2. Trigger ripple shockwave
    triggerCosmicRipple(x, y, !isDark);

    // 3. Toggle theme state
    setIsAnimating(true);
    setIsDark((prev) => !prev);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const triggerCosmicRipple = (originX: number, originY: number, nextIsDark: boolean) => {
    const wave = document.createElement('div');
    wave.className = `cosmic-theme-wave ${nextIsDark ? 'to-dark' : 'to-light'}`;
    wave.style.left = `${originX}px`;
    wave.style.top = `${originY}px`;
    document.body.appendChild(wave);

    setTimeout(() => {
      wave.remove();
    }, 1100);
  };

  return (
    <button
      onClick={handleToggle}
      className={`theme-toggle-dock-pill ${isDark ? 'dark-mode-active' : 'light-mode-active'} ${isAnimating ? 'animating' : ''}`}
      aria-label={isDark ? 'Switch to Light Studio Mode' : 'Switch to Midnight Celestial Mode'}
      title={isDark ? 'Switch to Warm Paper Light Mode' : 'Switch to Celestial Midnight Dark Mode'}
    >
      <div className="theme-toggle-slider">
        <span className="theme-icon sun-icon">
          <Sun size={15} />
        </span>
        <span className="theme-icon moon-icon">
          <Moon size={15} />
        </span>
      </div>

      <span className="theme-label-text">
        {isDark ? 'midnight' : 'paper'}
      </span>

      <span className="theme-sparkle-indicator">
        <Sparkles size={11} className="sparkle-svg" />
      </span>
    </button>
  );
};
