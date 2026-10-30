import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BackgroundParallax.css';

gsap.registerPlugin(ScrollTrigger);

export const BackgroundParallax: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Smooth continuous scroll parallax on gradient light orbs
      gsap.to(orb1Ref.current, {
        y: 400,
        x: -120,
        scale: 1.25,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });

      gsap.to(orb2Ref.current, {
        y: -350,
        x: 100,
        scale: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      });

      gsap.to(orb3Ref.current, {
        y: 250,
        x: -80,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.8,
        },
      });

      gsap.to(gridRef.current, {
        y: 150,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="modern-bg-container" aria-hidden="true">
      {/* Dynamic Grid Overlay */}
      <div ref={gridRef} className="modern-bg-grid" />

      {/* Radiant Glowing Orbs */}
      <div ref={orb1Ref} className="modern-glow-orb orb-primary" />
      <div ref={orb2Ref} className="modern-glow-orb orb-secondary" />
      <div ref={orb3Ref} className="modern-glow-orb orb-tertiary" />

      {/* Subtle Noise Texture for high-end organic finish */}
      <div className="modern-bg-noise" />
    </div>
  );
};
