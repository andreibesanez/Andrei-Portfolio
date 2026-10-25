import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Compass } from 'lucide-react';
import './ObservatoryBackground.css';

gsap.registerPlugin(ScrollTrigger);

interface StarNode {
  id: number;
  cx: number;
  cy: number;
  r: number;
  opacity: number;
  twinkle: number;
}

interface CelestialBeacon {
  id: string;
  name: string;
  bayer: string;
  constellation: string;
  cx: number;
  cy: number;
  magnitude: string;
  distance: string;
  lore: string;
}

const BEACONS: CelestialBeacon[] = [
  {
    id: 'polaris',
    name: 'Polaris',
    bayer: 'Alpha Ursae Minoris',
    constellation: 'Ursa Minor',
    cx: 520,
    cy: 80,
    magnitude: '1.98 (V)',
    distance: '433 Light Years',
    lore: 'The True North Pivot: Fixed celestial axis for hemispheric navigation, perfectly aligned with the Earth\'s rotational pole.'
  },
  {
    id: 'betelgeuse',
    name: 'Betelgeuse',
    bayer: 'Alpha Orionis',
    constellation: 'Orion',
    cx: 260,
    cy: 520,
    magnitude: '0.50 (Variable)',
    distance: '548 Light Years',
    lore: 'The Hunter\'s Shoulder: A pulsating red supergiant of colossal radius, nearing its terminal supernova epoch.'
  },
  {
    id: 'deneb',
    name: 'Deneb',
    bayer: 'Alpha Cygni',
    constellation: 'Cygnus',
    cx: 1220,
    cy: 280,
    magnitude: '1.25',
    distance: '2,615 Light Years',
    lore: 'Zenith Beacon: An exceptionally luminous white-blue supergiant anchoring the Summer Triangle above the celestial meridian.'
  },
  {
    id: 'acrux',
    name: 'Acrux',
    bayer: 'Alpha Crucis',
    constellation: 'Crux',
    cx: 1440,
    cy: 860,
    magnitude: '0.77',
    distance: '320 Light Years',
    lore: 'Southern Anchor: Brilliant triple-star system guiding travelers across the southern maritime horizon, visible from Philippine skies.'
  }
];

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14) >>> 0) / 4294967296);
  };
}

export const ObservatoryBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nebulaRef = useRef<SVGGElement>(null);
  const starsRef = useRef<SVGGElement>(null);
  const constellationsRef = useRef<SVGGElement>(null);
  const orbitalsRef = useRef<SVGGElement>(null);
  const scientificRef = useRef<SVGGElement>(null);

  const [activeBeacon, setActiveBeacon] = useState<CelestialBeacon | null>(null);
  const [hoveredCluster, setHoveredCluster] = useState<string | null>(null);

  const location = useLocation();

  // Stable, deterministic star field (computed once, never regenerated on renders)
  const stars = useMemo<StarNode[]>(() => {
    const rand = mulberry32(192608);
    const starList: StarNode[] = [];
    const count = 125;

    for (let i = 0; i < count; i++) {
      const cx = Math.round(rand() * 1920);
      const cy = Math.round(rand() * 1080);
      const isAnchor = rand() < 0.1;
      const r = isAnchor
        ? parseFloat((2.2 + rand() * 1.1).toFixed(2))
        : parseFloat((0.75 + rand() * 0.95).toFixed(2));
      const opacity = parseFloat((0.2 + rand() * 0.6).toFixed(2));
      const twinkle = rand() < 0.35 ? Math.floor(rand() * 3) + 1 : 0;

      starList.push({ id: i, cx, cy, r, opacity, twinkle });
    }
    return starList;
  }, []);

  // GSAP ScrollTrigger Master Parallax
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          invalidateOnRefresh: true
        }
      });

      if (nebulaRef.current) {
        scrollTl.to(nebulaRef.current, { yPercent: -8, xPercent: 1.5, ease: 'none' }, 0);
      }
      if (starsRef.current) {
        scrollTl.to(starsRef.current, { yPercent: -14, xPercent: -2, ease: 'none' }, 0);
      }
      if (constellationsRef.current) {
        scrollTl.to(constellationsRef.current, { yPercent: -26, xPercent: 3.5, ease: 'none' }, 0);
      }
      if (orbitalsRef.current) {
        scrollTl.to(orbitalsRef.current, { yPercent: -18, xPercent: -2, rotation: 18, transformOrigin: '52% 48%', ease: 'none' }, 0);
      }
      if (scientificRef.current) {
        scrollTl.to(scientificRef.current, { yPercent: -34, xPercent: -3, ease: 'none' }, 0);
      }
    }, containerRef);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Refresh on route change
  useEffect(() => {
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
    return () => clearTimeout(refreshTimer);
  }, [location.pathname]);

  return (
    <div ref={containerRef} className="obs-astronomical-canvas-wrap" aria-hidden="false">
      {/* Layer A: Deep-space gradient foundation */}
      <div className="obs-deepspace-gradient-base" />

      <svg
        className="obs-astronomical-svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="nebulaZenithGlow" cx="28%" cy="25%" r="45%">
            <stop offset="0%" stopColor="var(--navy)" stopOpacity="0.45" />
            <stop offset="65%" stopColor="var(--navy)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--navy)" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="nebulaBrassGlow" cx="76%" cy="62%" r="40%">
            <stop offset="0%" stopColor="var(--brass)" stopOpacity="0.22" />
            <stop offset="60%" stopColor="var(--brass)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--brass)" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="nebulaSouthernWash" cx="50%" cy="85%" r="48%">
            <stop offset="0%" stopColor="var(--navy)" stopOpacity="0.35" />
            <stop offset="70%" stopColor="var(--navy)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--navy)" stopOpacity="0" />
          </radialGradient>

          <pattern id="celestialDraftingGrid" width="160" height="160" patternUnits="userSpaceOnUse">
            <path
              d="M 160 0 L 0 0 0 160"
              fill="none"
              stroke="var(--border-brass-light)"
              strokeWidth="0.5"
              strokeDasharray="2 6"
            />
            <circle cx="160" cy="160" r="1.5" fill="var(--brass)" opacity="0.35" />
          </pattern>
        </defs>

        {/* Faint Meridian Grid Base */}
        <rect width="100%" height="100%" fill="url(#celestialDraftingGrid)" opacity="0.55" />

        {/* LAYER E: Atmospheric Nebula Clouds */}
        <g ref={nebulaRef} className="obs-layer-nebula">
          <rect width="100%" height="100%" fill="url(#nebulaZenithGlow)" />
          <rect width="100%" height="100%" fill="url(#nebulaBrassGlow)" />
          <rect width="100%" height="100%" fill="url(#nebulaSouthernWash)" />
        </g>

        {/* LAYER D: Celestial Orbital Paths */}
        <g ref={orbitalsRef} className="obs-layer-orbitals">
          <ellipse
            cx="960"
            cy="540"
            rx="960"
            ry="440"
            transform="rotate(-16 960 540)"
            fill="none"
            stroke="var(--brass)"
            strokeWidth="0.85"
            strokeDasharray="5 9"
            opacity="0.25"
          />
          <ellipse
            cx="860"
            cy="500"
            rx="640"
            ry="310"
            transform="rotate(22 860 500)"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="0.75"
            strokeDasharray="3 7"
            opacity="0.2"
          />
          <circle
            cx="1280"
            cy="480"
            r="420"
            fill="none"
            stroke="var(--brass)"
            strokeWidth="0.7"
            strokeDasharray="4 8"
            opacity="0.2"
          />
          <circle
            cx="1280"
            cy="480"
            r="240"
            fill="none"
            stroke="var(--brass)"
            strokeWidth="0.65"
            strokeDasharray="1 5"
            opacity="0.25"
          />
          <circle
            cx="1280"
            cy="480"
            r="252"
            fill="none"
            stroke="var(--brass)"
            strokeWidth="0.5"
            opacity="0.15"
          />
          <ellipse
            cx="320"
            cy="380"
            rx="480"
            ry="240"
            transform="rotate(-28 320 380)"
            fill="none"
            stroke="var(--brass)"
            strokeWidth="0.6"
            strokeDasharray="2 6"
            opacity="0.18"
          />
        </g>

        {/* LAYER B: Distant Stars */}
        <g ref={starsRef} className="obs-layer-stars">
          {stars.map((star) => (
            <circle
              key={star.id}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="var(--gold)"
              opacity={star.opacity}
              className={star.twinkle > 0 ? `obs-twinkle-${star.twinkle}` : undefined}
            />
          ))}
        </g>

        {/* LAYER C: Constellation Networks */}
        <g ref={constellationsRef} className="obs-layer-constellations">
          {/* 1. Ursa Major & Polaris */}
          <g
            className={`obs-constellation ${hoveredCluster === 'uma' ? 'active-cluster' : ''}`}
            opacity={hoveredCluster === 'uma' ? '0.85' : '0.5'}
            onMouseEnter={() => setHoveredCluster('uma')}
            onMouseLeave={() => setHoveredCluster(null)}
          >
            <line x1="180" y1="160" x2="240" y2="175" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="240" y1="175" x2="300" y2="195" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="300" y1="195" x2="370" y2="230" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="370" y1="230" x2="360" y2="290" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="360" y1="290" x2="450" y2="310" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="450" y1="310" x2="470" y2="240" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="470" y1="240" x2="370" y2="230" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="450" y1="310" x2="520" y2="80" stroke="var(--brass)" strokeWidth="0.6" strokeDasharray="3 4" opacity="0.45" />

            <circle cx="180" cy="160" r="3" fill="var(--gold)" className="obs-twinkle-1" />
            <circle cx="240" cy="175" r="2.5" fill="var(--gold)" />
            <circle cx="300" cy="195" r="2.8" fill="var(--gold)" />
            <circle cx="370" cy="230" r="2.5" fill="var(--gold)" />
            <circle cx="360" cy="290" r="2.5" fill="var(--gold)" />
            <circle cx="450" cy="310" r="3.2" fill="var(--gold)" className="obs-twinkle-2" />
            <circle cx="470" cy="240" r="3" fill="var(--gold)" />
            <text x="360" y="325" className="obs-constellation-label">URSA MAJOR</text>
          </g>

          {/* 2. Cassiopeia */}
          <g
            className={`obs-constellation ${hoveredCluster === 'cas' ? 'active-cluster' : ''}`}
            opacity={hoveredCluster === 'cas' ? '0.85' : '0.48'}
            onMouseEnter={() => setHoveredCluster('cas')}
            onMouseLeave={() => setHoveredCluster(null)}
          >
            <line x1="1480" y1="120" x2="1550" y2="150" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="1550" y1="150" x2="1610" y2="115" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="1610" y1="115" x2="1680" y2="165" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="1680" y1="165" x2="1750" y2="130" stroke="var(--brass)" strokeWidth="0.8" />

            <circle cx="1480" cy="120" r="2.8" fill="var(--gold)" className="obs-twinkle-2" />
            <circle cx="1550" cy="150" r="3" fill="var(--gold)" />
            <circle cx="1610" cy="115" r="3.4" fill="var(--gold)" className="obs-twinkle-1" />
            <circle cx="1680" cy="165" r="2.6" fill="var(--gold)" />
            <circle cx="1750" cy="130" r="3" fill="var(--gold)" className="obs-twinkle-3" />
            <text x="1600" y="98" className="obs-constellation-label">CASSIOPEIA • 60°N</text>
          </g>

          {/* 3. Cygnus */}
          <g
            className={`obs-constellation ${hoveredCluster === 'cyg' ? 'active-cluster' : ''}`}
            opacity={hoveredCluster === 'cyg' ? '0.85' : '0.45'}
            onMouseEnter={() => setHoveredCluster('cyg')}
            onMouseLeave={() => setHoveredCluster(null)}
          >
            <line x1="1220" y1="280" x2="1280" y2="370" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="1280" y1="370" x2="1340" y2="480" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="1190" y1="390" x2="1280" y2="370" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="1280" y1="370" x2="1370" y2="350" stroke="var(--brass)" strokeWidth="0.8" />

            <circle cx="1280" cy="370" r="2.8" fill="var(--gold)" />
            <circle cx="1340" cy="480" r="2.6" fill="var(--gold)" className="obs-twinkle-2" />
            <circle cx="1190" cy="390" r="2.5" fill="var(--gold)" />
            <circle cx="1370" cy="350" r="2.6" fill="var(--gold)" />
            <text x="1270" y="495" className="obs-constellation-label">CYGNUS CROSS</text>
          </g>

          {/* 4. Orion */}
          <g
            className={`obs-constellation ${hoveredCluster === 'ori' ? 'active-cluster' : ''}`}
            opacity={hoveredCluster === 'ori' ? '0.85' : '0.46'}
            onMouseEnter={() => setHoveredCluster('ori')}
            onMouseLeave={() => setHoveredCluster(null)}
          >
            <line x1="260" y1="520" x2="380" y2="500" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="260" y1="520" x2="310" y2="600" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="380" y1="500" x2="370" y2="590" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="310" y1="600" x2="340" y2="595" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="340" y1="595" x2="370" y2="590" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="310" y1="600" x2="280" y2="690" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="370" y1="590" x2="390" y2="675" stroke="var(--brass)" strokeWidth="0.8" />

            <circle cx="380" cy="500" r="3.2" fill="var(--gold)" />
            <circle cx="310" cy="600" r="2.5" fill="var(--gold)" />
            <circle cx="340" cy="595" r="2.5" fill="var(--gold)" />
            <circle cx="370" cy="590" r="2.5" fill="var(--gold)" />
            <circle cx="280" cy="690" r="2.8" fill="var(--gold)" />
            <circle cx="390" cy="675" r="3.8" fill="var(--gold)" className="obs-twinkle-2" />
            <text x="315" y="618" className="obs-constellation-label">ORION BELT</text>
          </g>

          {/* 5. Crux */}
          <g
            className={`obs-constellation ${hoveredCluster === 'crx' ? 'active-cluster' : ''}`}
            opacity={hoveredCluster === 'crx' ? '0.85' : '0.48'}
            onMouseEnter={() => setHoveredCluster('crx')}
            onMouseLeave={() => setHoveredCluster(null)}
          >
            <line x1="1440" y1="740" x2="1440" y2="860" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="1390" y1="790" x2="1490" y2="805" stroke="var(--brass)" strokeWidth="0.8" />
            <line x1="1560" y1="840" x2="1640" y2="870" stroke="var(--brass)" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.4" />

            <circle cx="1440" cy="740" r="3.2" fill="var(--gold)" className="obs-twinkle-3" />
            <circle cx="1390" cy="790" r="2.6" fill="var(--gold)" />
            <circle cx="1490" cy="805" r="2.8" fill="var(--gold)" className="obs-twinkle-2" />
            <circle cx="1560" cy="840" r="3" fill="var(--gold)" />
            <circle cx="1640" cy="870" r="3.5" fill="var(--gold)" />
            <text x="1410" y="725" className="obs-constellation-label">CRUX • 60°S</text>
          </g>
        </g>

        {/* INTERACTIVE CELESTIAL BEACONS (Clickable Nodes) */}
        <g className="obs-interactive-beacons">
          {BEACONS.map((b) => {
            const isTargeted = activeBeacon?.id === b.id;

            return (
              <g
                key={b.id}
                className="obs-beacon-anchor"
                onClick={() => setActiveBeacon(isTargeted ? null : b)}
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
              >
                {/* Orbital radar ring */}
                <circle
                  cx={b.cx}
                  cy={b.cy}
                  r={isTargeted ? 14 : 9}
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth="0.8"
                  strokeDasharray="2 3"
                  className="obs-beacon-radar"
                />
                {/* Core Star */}
                <circle
                  cx={b.cx}
                  cy={b.cy}
                  r={isTargeted ? 5.5 : 4}
                  fill={isTargeted ? '#ffffff' : 'var(--gold)'}
                  stroke="var(--navy)"
                  strokeWidth="1.2"
                />
                {/* Title marker */}
                <text x={b.cx + 12} y={b.cy + 4} className="obs-beacon-title">
                  ✦ {b.name}
                </text>
              </g>
            );
          })}
        </g>

        {/* LAYER F: Fine Scientific Coordinates */}
        <g ref={scientificRef} className="obs-layer-scientific" opacity="0.4">
          <line x1="0" y1="270" x2="1920" y2="270" stroke="var(--border-brass)" strokeWidth="0.5" strokeDasharray="3 10" />
          <line x1="0" y1="540" x2="1920" y2="540" stroke="var(--border-brass)" strokeWidth="0.6" strokeDasharray="4 8" />
          <line x1="0" y1="810" x2="1920" y2="810" stroke="var(--border-brass)" strokeWidth="0.5" strokeDasharray="3 10" />
          <line x1="960" y1="0" x2="960" y2="1080" stroke="var(--border-brass)" strokeWidth="0.6" strokeDasharray="4 8" />

          <path d="M 120 180 L 140 180 M 130 170 L 130 190" stroke="var(--brass)" strokeWidth="0.8" />
          <text x="145" y="184" className="obs-scientific-coord">ZENITH REF • AZ 000°</text>

          <path d="M 1780 220 L 1800 220 M 1790 210 L 1790 230" stroke="var(--brass)" strokeWidth="0.8" />
          <text x="1660" y="224" className="obs-scientific-coord">RA 23h 59m • DEC +60°</text>

          <path d="M 960 540 L 980 540 M 970 530 L 970 550" stroke="var(--brass)" strokeWidth="0.8" />
          <text x="988" y="544" className="obs-scientific-coord">CELESTIAL ORIGIN • J2026.5</text>

          <path d="M 280 880 L 300 880 M 290 870 L 290 890" stroke="var(--brass)" strokeWidth="0.8" />
          <text x="306" y="884" className="obs-scientific-coord">OBS DIGOS • 06°44'N 125°22'E</text>
        </g>
      </svg>

      {/* Floating Beacon Dossier Tooltip */}
      {activeBeacon && (
        <aside
          aria-label="Celestial Star Telemetry"
          className="obs-beacon-tooltip-card"
          style={{
            left: `${Math.min(80, Math.max(20, (activeBeacon.cx / 1920) * 100))}%`,
            top: `${Math.min(75, Math.max(15, (activeBeacon.cy / 1080) * 100))}%`
          }}
        >
          <div className="obs-beacon-tooltip-top">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Compass size={13} color="var(--brass)" />
              <span className="obs-beacon-tooltip-name">{activeBeacon.name}</span>
              <span className="obs-beacon-tooltip-constellation">({activeBeacon.constellation})</span>
            </div>
            <button
              onClick={() => setActiveBeacon(null)}
              className="obs-beacon-tooltip-close"
              aria-label="Close star details"
            >
              <X size={13} />
            </button>
          </div>

          <div className="obs-beacon-tooltip-meta">
            <div>
              <span className="obs-b-meta-label">BAYER DESIGNATION:</span>
              <span className="obs-b-meta-val">{activeBeacon.bayer}</span>
            </div>
            <div>
              <span className="obs-b-meta-label">MAGNITUDE & DISTANCE:</span>
              <span className="obs-b-meta-val">{activeBeacon.magnitude} • {activeBeacon.distance}</span>
            </div>
          </div>

          <p className="obs-beacon-tooltip-lore">{activeBeacon.lore}</p>
        </aside>
      )}
    </div>
  );
};
