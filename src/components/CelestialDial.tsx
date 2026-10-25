import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Compass, RotateCcw, Crosshair } from 'lucide-react';
import './CelestialDial.css';

interface TargetAlignment {
  angle: number;
  name: string;
  constellation: string;
  coords: string;
  note: string;
}

const ALIGNMENTS: TargetAlignment[] = [
  {
    angle: 0,
    name: 'Polaris (Alpha UMi)',
    constellation: 'Ursa Minor',
    coords: 'RA 02h 31m • DEC +89° 15′',
    note: 'The True North Pivot: Fixed navigational anchor used by historical seafarers and cartographers.'
  },
  {
    angle: 45,
    name: 'Deneb (Alpha Cyg)',
    constellation: 'Cygnus',
    coords: 'RA 20h 41m • DEC +45° 16′',
    note: 'Zenith Beacon: A luminous supergiant anchoring the Summer Triangle above the meridian.'
  },
  {
    angle: 90,
    name: 'Altair (Alpha Aql)',
    constellation: 'Aquila',
    coords: 'RA 19h 50m • DEC +08° 52′',
    note: 'Equatorial Crossing: Fast-rotating celestial coordinate marker in the eastern quadrant.'
  },
  {
    angle: 135,
    name: 'Vega (Alpha Lyr)',
    constellation: 'Lyra',
    coords: 'RA 18h 36m • DEC +38° 47′',
    note: 'Photometric Standard: Historic zero-point reference for stellar magnitude calibration.'
  },
  {
    angle: 180,
    name: 'Acrux (Alpha Cru)',
    constellation: 'Crux',
    coords: 'RA 12h 26m • DEC -63° 05′',
    note: 'Southern Cross Anchor: Visible from Philippine latitudes, orienting the southern horizon.'
  },
  {
    angle: 225,
    name: 'Sirius (Alpha CMa)',
    constellation: 'Canis Major',
    coords: 'RA 06h 45m • DEC -16° 42′',
    note: 'The Scorching Star: The brightest optical luminary in the nocturnal sky, ancient calendar marker.'
  },
  {
    angle: 270,
    name: 'Betelgeuse (Alpha Ori)',
    constellation: 'Orion',
    coords: 'RA 05h 55m • DEC +07° 24′',
    note: 'The Hunter Shoulder: Pulsating red supergiant marking the winter celestial gateway.'
  },
  {
    angle: 315,
    name: 'Schedar (Alpha Cas)',
    constellation: 'Cassiopeia',
    coords: 'RA 00h 40m • DEC +56° 32′',
    note: 'The Throne of Cassiopeia: Circumpolar asterism opposite Ursa Major across the celestial pole.'
  }
];

export const CelestialDial: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [angle, setAngle] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const dialRef = useRef<SVGSVGElement>(null);

  // Find closest alignment
  const closestAlignment = ALIGNMENTS.reduce((prev, curr) => {
    const diffCurr = Math.min(Math.abs(curr.angle - angle), 360 - Math.abs(curr.angle - angle));
    const diffPrev = Math.min(Math.abs(prev.angle - angle), 360 - Math.abs(prev.angle - angle));
    return diffCurr < diffPrev ? curr : prev;
  });

  const isAligned = Math.min(Math.abs(closestAlignment.angle - angle), 360 - Math.abs(closestAlignment.angle - angle)) < 8;

  const calculateAngleFromPoint = useCallback((clientX: number, clientY: number) => {
    if (!dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;

    let rad = Math.atan2(dy, dx);
    let deg = (rad * 180) / Math.PI + 90; // 0 deg at top
    if (deg < 0) deg += 360;
    setAngle(Math.round(deg % 360));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    calculateAngleFromPoint(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches[0]) {
      calculateAngleFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        calculateAngleFromPoint(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        calculateAngleFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, calculateAngleFromPoint]);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setAngle((prev) => (prev + 5) % 360);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setAngle((prev) => (prev - 5 + 360) % 360);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setAngle(0);
    }
  };

  const setPreset = (targetAngle: number) => {
    setAngle(targetAngle);
  };

  // Convert angle into Right Ascension (24 hours) & Declination (-90° to +90°)
  const raHours = Math.floor((angle / 360) * 24);
  const raMinutes = Math.floor(((angle / 360) * 24 - raHours) * 60);
  const decDegrees = Math.round(Math.cos((angle * Math.PI) / 180) * 89);

  return (
    <div className={`obs-astrolabe-instrument ${className}`}>
      {/* Instrument Outer Housing */}
      <div className="obs-instrument-frame">
        <div className="obs-card-bracket-tl" />
        <div className="obs-card-bracket-tr" />
        <div className="obs-card-bracket-bl" />
        <div className="obs-card-bracket-br" />

        <div className="obs-instrument-header">
          <div className="obs-instrument-tag">
            <Compass size={13} color="var(--brass)" />
            <span>CALIBRATION DIAL • MERIDIAN GAUGE</span>
          </div>
          <span className="obs-instrument-instruction">Drag Dial / Use Arrow Keys</span>
        </div>

        {/* Dial SVG Viewport */}
        <div className="obs-dial-viewport">
          <svg
            ref={dialRef}
            viewBox="0 0 400 400"
            className="obs-dial-svg"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="slider"
            aria-label="Celestial Astrolabe Azimuth Dial"
            aria-valuemin={0}
            aria-valuemax={360}
            aria-valuenow={angle}
            aria-valuetext={`${angle} degrees azimuth, aligned to ${closestAlignment.name}`}
          >
            <defs>
              <radialGradient id="dialParchmentGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--parchment)" stopOpacity="0.8" />
                <stop offset="70%" stopColor="var(--aged-paper)" stopOpacity="0.95" />
                <stop offset="100%" stopColor="var(--navy)" stopOpacity="0.25" />
              </radialGradient>
            </defs>

            {/* Base Radial Dial Bed */}
            <circle cx="200" cy="200" r="185" fill="url(#dialParchmentGlow)" stroke="var(--brass)" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="172" fill="none" stroke="var(--border-brass)" strokeWidth="0.8" />
            <circle cx="200" cy="200" r="125" fill="none" stroke="var(--border-brass-light)" strokeWidth="0.6" strokeDasharray="3 6" />
            <circle cx="200" cy="200" r="60" fill="none" stroke="var(--brass)" strokeWidth="0.8" />

            {/* Degree Ticks every 10° and 30° */}
            {Array.from({ length: 36 }).map((_, i) => {
              const deg = i * 10;
              const isMajor = deg % 30 === 0;
              const isCardinal = deg % 90 === 0;
              const tickLength = isCardinal ? 14 : isMajor ? 9 : 5;
              const rOuter = 184;
              const rInner = rOuter - tickLength;
              const rad = ((deg - 90) * Math.PI) / 180;
              const x1 = 200 + rOuter * Math.cos(rad);
              const y1 = 200 + rOuter * Math.sin(rad);
              const x2 = 200 + rInner * Math.cos(rad);
              const y2 = 200 + rInner * Math.sin(rad);

              return (
                <line
                  key={deg}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--brass)"
                  strokeWidth={isCardinal ? 1.5 : isMajor ? 1 : 0.6}
                  opacity={isCardinal ? 0.9 : isMajor ? 0.65 : 0.35}
                />
              );
            })}

            {/* Cardinal Markers */}
            <text x="200" y="32" textAnchor="middle" className="obs-dial-cardinal">N</text>
            <text x="368" y="204" textAnchor="middle" className="obs-dial-cardinal">E</text>
            <text x="200" y="378" textAnchor="middle" className="obs-dial-cardinal">S</text>
            <text x="32" y="204" textAnchor="middle" className="obs-dial-cardinal">W</text>

            {/* Target Alignment Beacons */}
            {ALIGNMENTS.map((t) => {
              const rad = ((t.angle - 90) * Math.PI) / 180;
              const bx = 200 + 148 * Math.cos(rad);
              const by = 200 + 148 * Math.sin(rad);
              const active = Math.min(Math.abs(t.angle - angle), 360 - Math.abs(t.angle - angle)) < 8;

              return (
                <g key={t.angle} onClick={() => setPreset(t.angle)} style={{ cursor: 'pointer' }}>
                  <circle
                    cx={bx}
                    cy={by}
                    r={active ? 5 : 2.5}
                    fill={active ? 'var(--gold)' : 'var(--brass)'}
                    stroke={active ? 'var(--navy)' : 'none'}
                    strokeWidth="1"
                  />
                  {active && (
                    <circle
                      cx={bx}
                      cy={by}
                      r={9}
                      fill="none"
                      stroke="var(--gold)"
                      strokeWidth="1"
                      strokeDasharray="2 3"
                    />
                  )}
                </g>
              );
            })}

            {/* Rotating Alidade Pointer Arm */}
            <g transform={`rotate(${angle} 200 200)`} className="obs-dial-arm">
              {/* Sight arm line */}
              <line x1="200" y1="20" x2="200" y2="380" stroke="var(--brass)" strokeWidth="1.2" />

              {/* North / Sighting Vernier Needle */}
              <polygon
                points="200,16 193,45 207,45"
                fill="var(--gold)"
                stroke="var(--navy)"
                strokeWidth="1"
              />
              <circle cx="200" cy="20" r="3" fill="#ffffff" />

              {/* Counter-weight tail */}
              <circle cx="200" cy="360" r="7" fill="var(--brass)" stroke="var(--navy)" strokeWidth="1" />
              <line x1="200" y1="350" x2="200" y2="370" stroke="var(--aged-paper)" strokeWidth="1" />

              {/* Center Pivot Boss */}
              <circle cx="200" cy="200" r="18" fill="var(--navy)" stroke="var(--brass)" strokeWidth="1.5" />
              <circle cx="200" cy="200" r="12" fill="var(--aged-paper)" stroke="var(--gold)" strokeWidth="1" />
              <circle cx="200" cy="200" r="4" fill="var(--brass)" />
            </g>
          </svg>
        </div>

        {/* Live Telemetry Display Plaque */}
        <div className={`obs-telemetry-plaque ${isAligned ? 'aligned' : ''}`}>
          <div className="obs-telemetry-row-main">
            <div className="obs-telemetry-block">
              <span className="obs-telemetry-label">AZIMUTH ANGLE</span>
              <span className="obs-telemetry-value">
                {String(angle).padStart(3, '0')}° 00′
              </span>
            </div>

            <div className="obs-telemetry-block">
              <span className="obs-telemetry-label">RIGHT ASCENSION</span>
              <span className="obs-telemetry-value">
                {String(raHours).padStart(2, '0')}h {String(raMinutes).padStart(2, '0')}m
              </span>
            </div>

            <div className="obs-telemetry-block">
              <span className="obs-telemetry-label">DECLINATION</span>
              <span className="obs-telemetry-value">
                {decDegrees >= 0 ? `+${decDegrees}°` : `${decDegrees}°`}
              </span>
            </div>
          </div>

          <div className="obs-alignment-details">
            <div className="obs-alignment-header">
              <Crosshair size={13} color="var(--brass)" />
              <span className="obs-alignment-target-name">{closestAlignment.name}</span>
              <span className="obs-alignment-constellation">[{closestAlignment.constellation}]</span>
              {isAligned && <span className="obs-aligned-pill">✦ IN SIGHT</span>}
            </div>
            <p className="obs-alignment-note">{closestAlignment.note}</p>
          </div>

          {/* Quick Target Presets & Reset */}
          <div className="obs-dial-controls-row">
            <div className="obs-preset-pills">
              <button onClick={() => setPreset(0)} className={`obs-preset-btn ${angle === 0 ? 'active' : ''}`}>
                Polaris (0°)
              </button>
              <button onClick={() => setPreset(135)} className={`obs-preset-btn ${angle === 135 ? 'active' : ''}`}>
                Vega (135°)
              </button>
              <button onClick={() => setPreset(180)} className={`obs-preset-btn ${angle === 180 ? 'active' : ''}`}>
                Acrux (180°)
              </button>
              <button onClick={() => setPreset(270)} className={`obs-preset-btn ${angle === 270 ? 'active' : ''}`}>
                Betelgeuse (270°)
              </button>
            </div>

            <button onClick={() => setPreset(0)} className="obs-dial-reset-btn" title="Reset needle to Celestial True North">
              <RotateCcw size={12} />
              <span>Reset 0°</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
