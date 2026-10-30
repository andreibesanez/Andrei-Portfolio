import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { WorkspaceShell } from './components/WorkspaceShell';
import { HomeStudio } from './pages/HomeStudio';
import { ProfessionalView } from './pages/ProfessionalView';

const ScrollToAnchor: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToAnchor />
      <Routes>
        {/* Creative Illustrated Portfolio Mode */}
        <Route
          path="/"
          element={
            <WorkspaceShell>
              <HomeStudio />
            </WorkspaceShell>
          }
        />

        {/* Clean, Distraction-Free Professional Mode (CV / Resume for Recruiters) */}
        <Route path="/professional" element={<ProfessionalView />} />

        {/* Catch-all */}
        <Route
          path="*"
          element={
            <WorkspaceShell>
              <HomeStudio />
            </WorkspaceShell>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
