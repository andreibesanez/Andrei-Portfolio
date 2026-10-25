import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { useDiscovery } from '../context/DiscoveryContext';
import './DiscoveryHUD.css';

export const DiscoveryHUD: React.FC = () => {
  const { discoveredCount, totalCount, setIsJournalOpen, toastMessage, allUnlocked } = useDiscovery();

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <aside aria-label="Observatory Discovery" className="obs-discovery-toast" role="status" aria-live="polite">
          <Sparkles size={16} color="var(--brass)" className="obs-toast-sparkle" />
          <span>{toastMessage}</span>
        </aside>
      )}

      {/* Floating Journal Badge */}
      <div className="obs-discovery-hud-wrap">
        <button
          onClick={() => setIsJournalOpen(true)}
          className={`obs-discovery-hud-btn ${allUnlocked ? 'completed' : ''}`}
          title="Open Scholar's Field Journal • Track Discoveries"
          aria-label={`Open Celestial Field Journal (${discoveredCount} of ${totalCount} recorded)`}
        >
          <div className="obs-hud-icon-box">
            <Compass size={15} />
          </div>
          <div className="obs-hud-label-box">
            <span className="obs-hud-title">OBSERVATIONS</span>
            <span className="obs-hud-count">
              {discoveredCount}/{totalCount} {allUnlocked && '✦ COMPLETE'}
            </span>
          </div>
        </button>
      </div>
    </>
  );
};
