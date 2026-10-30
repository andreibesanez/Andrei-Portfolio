import React from 'react';
import './MascotCat.css';

export const MascotCat: React.FC = () => {
  return (
    <div className="mascot-wrapper" aria-label="Sleeping desk cat mascot">
      <svg
        className="mascot-svg"
        viewBox="0 0 160 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft shadow */}
        <ellipse cx="80" cy="80" rx="55" ry="7" fill="rgba(0, 0, 0, 0.06)" />

        {/* Sleeping Cat Body */}
        <path
          d="M35 72 C35 48, 55 42, 85 42 C115 42, 128 52, 128 72 C128 78, 120 78, 85 78 C45 78, 35 78, 35 72 Z"
          fill="#FFFFFF"
          stroke="#252525"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Cat Head */}
        <path
          d="M102 62 C102 52, 114 44, 128 45 C138 46, 145 54, 145 64 C145 72, 136 76, 125 76 C112 76, 102 72, 102 62 Z"
          fill="#FFFFFF"
          stroke="#252525"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Ears */}
        {/* Left Ear */}
        <path
          d="M112 47 L114 34 L125 45"
          fill="#FFFFFF"
          stroke="#252525"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right Ear */}
        <path
          d="M129 45 L138 36 L143 49"
          fill="#FFFFFF"
          stroke="#252525"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Sleeping Eyes (Closed Arcs) */}
        <path
          d="M122 59 Q127 63 132 59"
          stroke="#252525"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M135 60 Q139 64 143 60"
          stroke="#252525"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cute Nose and Whisker Dot */}
        <circle cx="134" cy="66" r="1.5" fill="#252525" />
        
        {/* Whiskers */}
        <path d="M137 66 L148 65" stroke="#777777" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M137 68 L147 70" stroke="#777777" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M116 67 L124 67" stroke="#777777" strokeWidth="1.2" strokeLinecap="round" />

        {/* Curled Tail */}
        <path
          d="M38 72 C26 70, 20 62, 22 55 C24 49, 30 50, 31 54 C32 60, 26 64, 38 67"
          fill="none"
          stroke="#252525"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Soft fur patch details */}
        <path
          d="M62 48 C68 44, 76 44, 82 48"
          stroke="#D0CECA"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Sleeping "zzz" motion elements */}
        <g className="mascot-zzz">
          <text x="145" y="32" className="zzz-text zzz-1">z</text>
          <text x="151" y="24" className="zzz-text zzz-2">z</text>
          <text x="156" y="15" className="zzz-text zzz-3">Z</text>
        </g>
      </svg>
    </div>
  );
};
