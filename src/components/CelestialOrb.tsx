import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CelestialOrb.css';

export const CelestialOrb: React.FC<{ size?: number; className?: string }> = ({
  size = 420,
  className = ''
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const ctx = gsap.context(() => {
      // Rotate outer celestial ring slowly
      gsap.to('.celestial-ring-outer', {
        rotation: 360,
        transformOrigin: '250px 250px',
        duration: 90,
        repeat: -1,
        ease: 'none'
      });

      // Rotate counter-ring
      gsap.to('.celestial-ring-mid', {
        rotation: -360,
        transformOrigin: '250px 250px',
        duration: 65,
        repeat: -1,
        ease: 'none'
      });

      // Subtle pulse on celestial stars
      gsap.to('.star-glow', {
        opacity: 0.25,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
        ease: 'sine.inOut'
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={`celestial-orb-wrapper ${className}`} style={{ width: size, height: size }}>
      <svg
        ref={svgRef}
        viewBox="0 0 500 500"
        className="celestial-svg"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="celestialGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#AE8950" stopOpacity="0.12" />
            <stop offset="60%" stopColor="#D7BD8B" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#18273B" stopOpacity="0" />
          </radialGradient>
          <filter id="brassGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Backdrop Subtle Ambient Radial */}
        <circle cx="250" cy="250" r="230" fill="url(#celestialGlow)" />

        {/* Outermost Measurement Ring with Degree Ticks */}
        <circle
          cx="250"
          cy="250"
          r="230"
          fill="none"
          stroke="var(--brass)"
          strokeWidth="1.2"
          strokeDasharray="4 8"
          opacity="0.45"
        />
        <circle
          cx="250"
          cy="250"
          r="220"
          fill="none"
          stroke="var(--brass)"
          strokeWidth="0.8"
          opacity="0.6"
        />

        {/* Cardinal Axis Markers */}
        <line x1="250" y1="12" x2="250" y2="488" stroke="var(--brass)" strokeWidth="0.75" strokeDasharray="3 5" opacity="0.4" />
        <line x1="12" y1="250" x2="488" y2="250" stroke="var(--brass)" strokeWidth="0.75" strokeDasharray="3 5" opacity="0.4" />

        {/* Celestial Coordinates Text */}
        <text x="250" y="28" textAnchor="middle" className="celestial-coord-label">N • 90° DEC</text>
        <text x="250" y="482" textAnchor="middle" className="celestial-coord-label">S • -90° DEC</text>
        <text x="472" y="254" textAnchor="end" className="celestial-coord-label">06h RA</text>
        <text x="28" y="254" textAnchor="start" className="celestial-coord-label">18h RA</text>

        {/* Outer Rotating Armillary Ring */}
        <g className="celestial-ring-outer">
          <ellipse
            cx="250"
            cy="250"
            rx="190"
            ry="75"
            fill="none"
            stroke="var(--brass)"
            strokeWidth="1.2"
            opacity="0.7"
            transform="rotate(25 250 250)"
          />
          {/* Ecliptic Star Nodes */}
          <circle cx="90" cy="210" r="3" fill="var(--brass)" />
          <circle cx="410" cy="290" r="3" fill="var(--brass)" />
          <circle cx="250" cy="175" r="2.5" fill="var(--gold)" />
          <circle cx="250" cy="325" r="2.5" fill="var(--gold)" />
        </g>

        {/* Mid Rotating Armillary Ring */}
        <g className="celestial-ring-mid">
          <ellipse
            cx="250"
            cy="250"
            rx="170"
            ry="60"
            fill="none"
            stroke="var(--celestial-ring)"
            strokeWidth="1.2"
            strokeDasharray="6 4"
            opacity="0.75"
            transform="rotate(-40 250 250)"
          />
          <circle cx="130" cy="180" r="2.5" fill="var(--celestial-ring)" />
          <circle cx="370" cy="320" r="2.5" fill="var(--celestial-ring)" />
        </g>

        {/* Static Astrolabe Core Grid */}
        <circle
          cx="250"
          cy="250"
          r="150"
          fill="none"
          stroke="var(--brass)"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <circle
          cx="250"
          cy="250"
          r="95"
          fill="none"
          stroke="var(--brass)"
          strokeWidth="1"
          opacity="0.65"
        />
        <circle
          cx="250"
          cy="250"
          r="45"
          fill="none"
          stroke="var(--celestial-ring)"
          strokeWidth="0.75"
          strokeDasharray="3 3"
          opacity="0.6"
        />

        {/* Constellation Diagram (Orion Motif) */}
        <g className="constellation-group" stroke="var(--brass)" strokeWidth="0.8" opacity="0.6">
          <line x1="220" y1="230" x2="250" y2="250" strokeDasharray="2 3" />
          <line x1="250" y1="250" x2="280" y2="270" strokeDasharray="2 3" />
          <line x1="220" y1="230" x2="200" y2="190" strokeDasharray="2 3" />
          <line x1="280" y1="270" x2="310" y2="310" strokeDasharray="2 3" />
          <line x1="200" y1="190" x2="280" y2="180" strokeDasharray="2 3" />
          <line x1="280" y1="180" x2="310" y2="310" strokeDasharray="2 3" />

          {/* Stars */}
          <circle cx="200" cy="190" r="3.5" fill="var(--navy)" className="star-glow" />
          <circle cx="280" cy="180" r="4.5" fill="var(--brass)" className="star-glow" filter="url(#brassGlow)" />
          <circle cx="220" cy="230" r="2.5" fill="var(--brass)" />
          <circle cx="250" cy="250" r="2.5" fill="var(--gold)" />
          <circle cx="280" cy="270" r="2.5" fill="var(--brass)" />
          <circle cx="310" cy="310" r="4" fill="var(--navy)" className="star-glow" />
        </g>

        {/* Central North Star / Polaris Emblem */}
        <g transform="translate(250 250)">
          <circle cx="0" cy="0" r="7" fill="var(--brass)" />
          <circle cx="0" cy="0" r="14" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0.7" />
          {/* Compass Points */}
          <polygon points="0,-18 2.5,-6 0,0 -2.5,-6" fill="var(--brass)" />
          <polygon points="0,18 2.5,6 0,0 -2.5,6" fill="var(--brass)" />
          <polygon points="-18,0 -6,-2.5 0,0 -6,2.5" fill="var(--brass)" />
          <polygon points="18,0 6,-2.5 0,0 6,2.5" fill="var(--brass)" />
        </g>
      </svg>
    </div>
  );
};
