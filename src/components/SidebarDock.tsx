import React, { useRef, useEffect } from 'react';
import {
  User,
  Briefcase,
  FolderGit2,
  Sparkles,
  Award,
  Mail,
  Laptop,
  MessageSquare,
  GripVertical
} from 'lucide-react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import './SidebarDock.css';

// Register Draggable and Inertia
gsap.registerPlugin(Draggable, InertiaPlugin);

interface SidebarDockProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const SidebarDock: React.FC<SidebarDockProps> = ({ activeSection, onNavigate }) => {
  const dockRef = useRef<HTMLElement>(null);

  const navItems: NavItem[] = [
    { id: 'about', label: 'About Me', icon: <User size={18} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Sparkles size={18} /> },
    { id: 'certificates', label: 'Certificates', icon: <Award size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
    { id: 'gear', label: 'Gear', icon: <Laptop size={18} /> },
    { id: 'visitor-chat', label: 'Visitor Chat', icon: <MessageSquare size={18} /> },
  ];

  useEffect(() => {
    // MAKE DESKTOP DOCK DRAGGABLE ALONG Y AXIS WITH INERTIA & SNAP TO EDGES
    if (dockRef.current && window.innerWidth > 860) {
      const dragInstance = Draggable.create(dockRef.current, {
        type: 'y',
        trigger: '.dock-drag-handle',
        bounds: window,
        inertia: true,
        edgeResistance: 0.75,
        cursor: 'grab',
        activeCursor: 'grabbing',
        snap: function (endValue) {
          // Snap smoothly to natural vertical heights
          return Math.round(endValue / 60) * 60;
        },
      });

      return () => {
        dragInstance[0]?.kill();
      };
    }
  }, []);

  return (
    <>
      {/* Desktop Left-Floating Draggable Expanding Dock */}
      <nav ref={dockRef} className="desktop-sidebar-dock" aria-label="Main Navigation">
        <div className="dock-container">
          {/* Draggable Grip Handle */}
          <div className="dock-drag-handle" title="Drag dock vertically">
            <GripVertical size={14} />
          </div>

          <ul className="dock-list">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="dock-item-wrapper">
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`dock-button ${isActive ? 'active' : ''}`}
                    aria-label={item.label}
                    title={item.label}
                  >
                    <span className="dock-icon">{item.icon}</span>
                    <span className="dock-label">{item.label}</span>
                    {isActive && <span className="dock-active-indicator" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Floating Bottom Bar for Essential Navigation */}
      <nav className="mobile-bottom-dock" aria-label="Mobile Navigation">
        <ul className="mobile-dock-list">
          {navItems.slice(0, 6).map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className="mobile-dock-item">
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`mobile-dock-btn ${isActive ? 'active' : ''}`}
                  aria-label={item.label}
                >
                  <span className="mobile-dock-icon">{item.icon}</span>
                  <span className="mobile-dock-text">{item.label.split(' ')[0]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
