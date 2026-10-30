import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BackgroundParallax } from './BackgroundParallax';
import './Layout.css';

export const Layout: React.FC = () => {
  return (
    <div className="modern-layout-shell">
      {/* Scroll-Reactive Ambient Background */}
      <BackgroundParallax />

      {/* Modern Floating Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="modern-main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
