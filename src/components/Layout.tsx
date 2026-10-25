import React from 'react';
import { Outlet } from 'react-router-dom';
import { ObservatoryNav } from './ObservatoryNav';
import { Footer } from './Footer';
import { CompassReturn } from './CompassReturn';
import { ObservatoryBackground } from './ObservatoryBackground';
import { DiscoveryProvider } from '../context/DiscoveryContext';
import { DiscoveryHUD } from './DiscoveryHUD';
import { DiscoveryJournalModal } from './DiscoveryJournalModal';
import './Layout.css';

export const Layout: React.FC = () => {
  return (
    <DiscoveryProvider>
      <div className="obs-layout-shell">
        <ObservatoryBackground />
        <ObservatoryNav />
        <div className="obs-layout-main-area">
          <main className="obs-main-viewport">
            <Outlet />
          </main>
          <Footer />
        </div>
        <CompassReturn />
        <DiscoveryHUD />
        <DiscoveryJournalModal />
      </div>
    </DiscoveryProvider>
  );
};
