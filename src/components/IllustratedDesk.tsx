import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import './IllustratedDesk.css';

// Register Draggable and InertiaPlugin
gsap.registerPlugin(Draggable, InertiaPlugin);

interface IllustratedDeskProps {
  onInteraction?: (item: string) => void;
}

export const IllustratedDesk: React.FC<IllustratedDeskProps> = ({ onInteraction }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const deskContainerRef = useRef<HTMLDivElement>(null);

  const handleItemHover = (name: string | null) => {
    setActiveTooltip(name);
    if (name && onInteraction) {
      onInteraction(name);
    }
  };

  useEffect(() => {
    // 1. MAKE STICKY NOTES TOSSABLE & DRAGGABLE WITH INERTIA + ROTATION
    const pinkDraggable = Draggable.create('.sticky-pink', {
      type: 'x,y',
      bounds: deskContainerRef.current || undefined,
      edgeResistance: 0.65,
      inertia: true,
      cursor: 'grab',
      activeCursor: 'grabbing',
      onPress: () => {
        handleItemHover('Dragging Sticky Note: "Stay Curious :)"');
      },
      onDrag: function () {
        // Slight dynamic tilt based on horizontal velocity
        const vx = InertiaPlugin.getVelocity(this.target, 'x') || 0;
        gsap.to(this.target, { rotation: vx * 0.02, duration: 0.1, overwrite: 'auto' });
      },
      onRelease: function () {
        gsap.to(this.target, { rotation: -7, duration: 0.4, ease: 'back.out(2)' });
      },
    });

    const yellowDraggable = Draggable.create('.sticky-yellow', {
      type: 'x,y',
      bounds: deskContainerRef.current || undefined,
      edgeResistance: 0.65,
      inertia: true,
      cursor: 'grab',
      activeCursor: 'grabbing',
      onPress: () => {
        handleItemHover('Dragging Sticky Note: "</>"');
      },
      onDrag: function () {
        const vx = InertiaPlugin.getVelocity(this.target, 'x') || 0;
        gsap.to(this.target, { rotation: vx * 0.02, duration: 0.1, overwrite: 'auto' });
      },
      onRelease: function () {
        gsap.to(this.target, { rotation: -5, duration: 0.4, ease: 'back.out(2)' });
      },
    });

    // 2. MAKE COFFEE MUG DRAGGABLE & TOSSABLE WITH HIT-TEST & INERTIA
    const coffeeDraggable = Draggable.create('.desk-coffee', {
      type: 'x,y',
      bounds: deskContainerRef.current || undefined,
      edgeResistance: 0.8,
      inertia: true,
      cursor: 'grab',
      activeCursor: 'grabbing',
      onPress: () => {
        handleItemHover('Picked up Hot Coffee Cup! ☕');
      },
      onDrag: function () {
        // Hit-test against laptop to trigger playful spill warning
        const laptopEl = document.querySelector('.desk-laptop');
        if (laptopEl && this.hitTest(laptopEl, '20%')) {
          handleItemHover('⚠️ Careful! Don’t spill coffee on the laptop!');
        }
      },
      onRelease: function () {
        handleItemHover('Placed coffee down smoothly.');
      },
    });

    // 3. RETRO RADIO TUNER DIAL SPINNABLE
    const radioDialDraggable = Draggable.create('.radio-tuning-dial', {
      type: 'rotation',
      inertia: true,
      snap: function (endValue) {
        // Snap in 30-degree increments like an authentic mechanical potentiometer notch
        return Math.round(endValue / 30) * 30;
      },
      onDrag: function () {
        handleItemHover(`Tuning Radio Frequency: ${Math.round(Math.abs(this.rotation % 360))} kHz`);
      },
      onDragEnd: function () {
        handleItemHover('Frequency Locked! Lo-Fi Waves Synthesizing.');
      },
    });

    return () => {
      pinkDraggable[0]?.kill();
      yellowDraggable[0]?.kill();
      coffeeDraggable[0]?.kill();
      radioDialDraggable[0]?.kill();
    };
  }, []);

  return (
    <div ref={deskContainerRef} className="desk-container">
      {activeTooltip && (
        <div className="desk-tooltip-bubble" role="status">
          {activeTooltip}
        </div>
      )}

      <svg
        className="desk-svg"
        viewBox="0 0 680 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Interactive illustrated developer desk setup"
      >
        {/* Horizontal Desk Baseline */}
        <line x1="20" y1="160" x2="660" y2="160" stroke="#252525" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="164" x2="640" y2="164" stroke="#E2E1DC" strokeWidth="1.5" strokeLinecap="round" />

        {/* 1. RETRO DESK RADIO / AUDIO SPEAKER (Left) */}
        <g
          className="interactive-desk-item desk-radio"
          tabIndex={0}
          onMouseEnter={() => handleItemHover('Retro Radio & Lo-Fi Beats')}
          onMouseLeave={() => handleItemHover(null)}
          onFocus={() => handleItemHover('Retro Radio & Lo-Fi Beats')}
          onBlur={() => handleItemHover(null)}
        >
          {/* Radio Body */}
          <rect x="50" y="95" width="85" height="65" rx="8" fill="#FFFFFF" stroke="#252525" strokeWidth="2.2" />
          {/* Speaker Grill */}
          <circle cx="80" cy="128" r="20" fill="#F3F2EE" stroke="#252525" strokeWidth="1.8" />
          <circle cx="80" cy="128" r="12" stroke="#268B72" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="80" cy="128" r="4" fill="#252525" />
          
          {/* Spinnable Mechanical Dial with Draggable rotation */}
          <g className="radio-tuning-dial" style={{ transformOrigin: '116px 115px', cursor: 'grab' }}>
            <circle cx="116" cy="115" r="9" fill="#FFFFFF" stroke="#252525" strokeWidth="1.8" />
            <line x1="116" y1="108" x2="116" y2="114" stroke="#268B72" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          
          <circle cx="116" cy="138" r="5" fill="#FFFFFF" stroke="#252525" strokeWidth="1.5" />
          {/* Antenna */}
          <line x1="60" y1="95" x2="42" y2="60" stroke="#252525" strokeWidth="2" strokeLinecap="round" />
          <circle cx="41" cy="58" r="2.5" fill="#268B72" />
          {/* Music Notes when active */}
          <g className="radio-notes">
            <path d="M72 82 Q76 74 82 78 L82 86" stroke="#268B72" strokeWidth="1.5" fill="none" />
            <circle cx="72" cy="85" r="2.5" fill="#268B72" />
          </g>
        </g>

        {/* 2. COLORFUL DRAGGABLE & TOSSABLE STICKY NOTES */}
        {/* Sticky Note 1: Pastel Pink (Smiley) - Draggable */}
        <g
          className="interactive-desk-item desk-sticky sticky-pink"
          tabIndex={0}
          onMouseEnter={() => handleItemHover('Drag me! Sticky Note: Stay Curious :)')}
          onMouseLeave={() => handleItemHover(null)}
        >
          <polygon points="148,110 188,105 194,145 154,150" fill="#FFE5EC" stroke="#252525" strokeWidth="1.8" />
          <text x="166" y="132" fontFamily="monospace" fontSize="14" fill="#252525" transform="rotate(-7 166 132)">:)</text>
        </g>

        {/* Sticky Note 2: Pastel Yellow (Heart / Code) - Draggable */}
        <g
          className="interactive-desk-item desk-sticky sticky-yellow"
          tabIndex={0}
          onMouseEnter={() => handleItemHover('Drag me! Sticky Note: Code with Passion & Clarity')}
          onMouseLeave={() => handleItemHover(null)}
        >
          <polygon points="178,92 218,88 222,128 182,132" fill="#FEF9C3" stroke="#252525" strokeWidth="1.8" />
          <text x="194" y="114" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="#268B72" transform="rotate(-5 194 114)">&lt;/&gt;</text>
        </g>

        {/* 3. MINIMALIST WORKSTATION LAPTOP (Center) */}
        <g
          className="interactive-desk-item desk-laptop"
          tabIndex={0}
          onMouseEnter={() => handleItemHover('Andrei’s Dev Environment: VS Code + React + Vite')}
          onMouseLeave={() => handleItemHover(null)}
        >
          {/* Screen Shell */}
          <rect x="250" y="65" width="160" height="90" rx="6" fill="#FFFFFF" stroke="#252525" strokeWidth="2.4" />
          {/* Inner Display */}
          <rect x="258" y="73" width="144" height="74" rx="3" fill="#F3F2EE" stroke="#E2E1DC" strokeWidth="1" />
          {/* Code Editor Window Header */}
          <circle cx="266" cy="80" r="2.5" fill="#EF4444" />
          <circle cx="274" cy="80" r="2.5" fill="#F59E0B" />
          <circle cx="282" cy="80" r="2.5" fill="#10B981" />
          {/* Editor Code Lines */}
          <line x1="266" y1="90" x2="310" y2="90" stroke="#268B72" strokeWidth="2" strokeLinecap="round" />
          <line x1="272" y1="98" x2="335" y2="98" stroke="#252525" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="272" y1="106" x2="360" y2="106" stroke="#686868" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="280" y1="114" x2="320" y2="114" stroke="#268B72" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="272" y1="122" x2="295" y2="122" stroke="#252525" strokeWidth="1.6" strokeLinecap="round" />
          {/* Terminal / Cursor blink */}
          <rect x="266" y="132" width="5" height="8" fill="#268B72" className="cursor-blink" />
          <line x1="275" y1="136" x2="340" y2="136" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" />

          {/* Laptop Base / Keyboard Hinge */}
          <path d="M232 155 L428 155 L422 160 L238 160 Z" fill="#E2E1DC" stroke="#252525" strokeWidth="2" strokeLinejoin="round" />
          <rect x="312" y="156" width="36" height="3" rx="1" fill="#FFFFFF" stroke="#252525" strokeWidth="1" />
        </g>

        {/* 4. DRAGGABLE & TOSSABLE STEAMING COFFEE MUG */}
        <g
          className="interactive-desk-item desk-coffee"
          tabIndex={0}
          onMouseEnter={() => handleItemHover('Drag me! Hot Brewed Coffee ☕')}
          onMouseLeave={() => handleItemHover(null)}
        >
          {/* Ceramic Cup */}
          <rect x="440" y="118" width="32" height="42" rx="4" fill="#FFFFFF" stroke="#252525" strokeWidth="2" />
          {/* Handle */}
          <path d="M472 126 C482 126, 482 144, 472 146" fill="none" stroke="#252525" strokeWidth="2" strokeLinecap="round" />
          {/* Cup Accent Stripe */}
          <line x1="440" y1="130" x2="472" y2="130" stroke="#268B72" strokeWidth="2" />
          {/* Steaming Vapor */}
          <path className="steam-line steam-1" d="M448 112 Q445 104 449 96" fill="none" stroke="#777777" strokeWidth="1.5" strokeLinecap="round" />
          <path className="steam-line steam-2" d="M456 110 Q460 102 455 94" fill="none" stroke="#777777" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* 5. STACKED HARDCOVER BOOKS (Scholarly Study) */}
        <g
          className="interactive-desk-item desk-books"
          tabIndex={0}
          onMouseEnter={() => handleItemHover('Books: Clean Architecture & System Design')}
          onMouseLeave={() => handleItemHover(null)}
        >
          {/* Book 1 (Bottom) */}
          <rect x="490" y="146" width="70" height="14" rx="2" fill="#FFFFFF" stroke="#252525" strokeWidth="2" />
          <line x1="495" y1="153" x2="550" y2="153" stroke="#268B72" strokeWidth="1.8" />
          {/* Book 2 (Middle) */}
          <rect x="495" y="133" width="62" height="13" rx="2" fill="#E6F3EE" stroke="#252525" strokeWidth="1.8" />
          {/* Book 3 (Top) */}
          <rect x="500" y="121" width="54" height="12" rx="2" fill="#FFFFFF" stroke="#252525" strokeWidth="1.8" />
          {/* Bookmark Ribbon */}
          <path d="M542 122 L542 136 L546 132 L550 136 L550 122" fill="#268B72" stroke="#268B72" strokeWidth="1" />
        </g>

        {/* 6. MINIMALIST DESK LAMP (Right) */}
        <g
          className="interactive-desk-item desk-lamp"
          tabIndex={0}
          onMouseEnter={() => handleItemHover('Warm Desk Lamp')}
          onMouseLeave={() => handleItemHover(null)}
        >
          {/* Base */}
          <ellipse cx="610" cy="159" rx="22" ry="4" fill="#FFFFFF" stroke="#252525" strokeWidth="2" />
          {/* Arm Stem */}
          <path d="M610 157 L610 90 L585 65" fill="none" stroke="#252525" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Joint Hinges */}
          <circle cx="610" cy="90" r="3.5" fill="#268B72" stroke="#252525" strokeWidth="1.5" />
          <circle cx="585" cy="65" r="3" fill="#252525" />
          {/* Lamp Shade (Conical Bell) */}
          <path d="M572 68 L602 52 L590 40 L560 56 Z" fill="#FFFFFF" stroke="#252525" strokeWidth="2.2" strokeLinejoin="round" />
          {/* Warm Light Glow Cone */}
          <polygon points="568,69 530,158 610,158 596,62" fill="rgba(254, 240, 138, 0.12)" className="lamp-glow" />
        </g>
      </svg>
    </div>
  );
};
