import React, { useEffect } from 'react';
import { X, Sparkles, BookOpen, Compass, RotateCcw, CheckCircle2, Lock } from 'lucide-react';
import { useDiscovery, DISCOVERIES } from '../context/DiscoveryContext';
import './DiscoveryJournalModal.css';

export const DiscoveryJournalModal: React.FC = () => {
  const {
    isJournalOpen,
    setIsJournalOpen,
    discoveredIds,
    activeDiscovery,
    setActiveDiscovery,
    resetDiscoveries,
    allUnlocked,
    discoveredCount,
    totalCount
  } = useDiscovery();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (isJournalOpen || activeDiscovery)) {
        setIsJournalOpen(false);
        setActiveDiscovery(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isJournalOpen, activeDiscovery, setIsJournalOpen, setActiveDiscovery]);

  if (!isJournalOpen && !activeDiscovery) return null;

  const closeModal = () => {
    setIsJournalOpen(false);
    setActiveDiscovery(null);
  };

  return (
    <div className="obs-journal-overlay" onClick={closeModal} role="dialog" aria-modal="true" aria-label="Scholar's Field Journal">
      <div className="obs-journal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Antique Corner Brackets */}
        <div className="obs-card-bracket-tl" />
        <div className="obs-card-bracket-tr" />
        <div className="obs-card-bracket-bl" />
        <div className="obs-card-bracket-br" />

        {/* Modal Header */}
        <div className="obs-journal-header">
          <div className="obs-journal-header-left">
            <div className="obs-journal-badge">
              <Compass size={14} color="var(--brass)" />
              <span>THE SCHOLAR'S CELESTIAL JOURNAL</span>
            </div>
            <h2 className="obs-journal-title">Field Observations of the Observatory</h2>
            <p className="obs-journal-subtitle">
              Authentic reflections, development philosophy, and academic milestones recorded across this digital study.
            </p>
          </div>

          <button
            onClick={closeModal}
            className="obs-journal-close-btn"
            aria-label="Close Journal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Gauge */}
        <div className="obs-journal-progress-bar">
          <div className="obs-journal-progress-meta">
            <span className="obs-journal-progress-label">RECORDING STATUS:</span>
            <span className="obs-journal-progress-count">
              {discoveredCount} OF {totalCount} CELESTIAL OBSERVATIONS CATALOGED
            </span>
          </div>
          <div className="obs-journal-progress-rail">
            <div
              className="obs-journal-progress-fill"
              style={{ width: `${(discoveredCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Unlocked Epilogue Banner (when 5/5) */}
        {allUnlocked && (
          <div className="obs-epilogue-card">
            <div className="obs-epilogue-tag">
              <Sparkles size={14} color="var(--brass)" />
              <span>THE SCHOLAR'S EPILOGUE • ARCHIVE COMPLETE</span>
            </div>
            <h3 className="obs-epilogue-heading">Thank You for Exploring My Study</h3>
            <p className="obs-epilogue-text">
              "You have recorded all five celestial markers across this portfolio. As an Information Technology undergraduate at Cor Jesu College, I believe the best software is built at the intersection of rigorous systems and thoughtful human design. Thank you for taking the time to discover my work and principles. I welcome the opportunity to build with you."
            </p>
            <div className="obs-epilogue-signature">
              <span>— Andrei Besañez</span>
              <span className="obs-epilogue-coords">BSIT • Digos City, Philippines</span>
            </div>
          </div>
        )}

        {/* Observations List */}
        <div className="obs-journal-entries-grid">
          {DISCOVERIES.map((item, idx) => {
            const isFound = discoveredIds.includes(item.id);
            const isSelected = activeDiscovery?.id === item.id;

            return (
              <div
                key={item.id}
                className={`obs-journal-entry-card ${isFound ? 'unlocked' : 'locked'} ${isSelected ? 'selected' : ''}`}
              >
                <div className="obs-entry-card-top">
                  <div className="obs-entry-glyph-box">
                    <span>{isFound ? item.symbol : <Lock size={12} />}</span>
                  </div>
                  <div className="obs-entry-heading-wrap">
                    <span className="obs-entry-section-code">
                      OBSERVATION 0{idx + 1} • {item.section}
                    </span>
                    <h4 className="obs-entry-title">
                      {isFound ? item.title : 'Unrecorded Celestial Coordinate'}
                    </h4>
                  </div>
                  {isFound ? (
                    <CheckCircle2 size={16} className="obs-entry-status-icon found" />
                  ) : (
                    <span className="obs-entry-status-icon pending">Awaiting</span>
                  )}
                </div>

                <div className="obs-entry-card-body">
                  {isFound ? (
                    <p className="obs-entry-insight-text">"{item.insight}"</p>
                  ) : (
                    <p className="obs-entry-clue-text">
                      <em>Clue: Explore {item.location} to locate this uncalibrated celestial seal.</em>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="obs-journal-footer">
          <div className="obs-journal-footer-hint">
            <BookOpen size={14} color="var(--brass)" />
            <span>Click any uncalibrated brass seal throughout the portfolio to record new insights.</span>
          </div>

          <div className="obs-journal-footer-buttons">
            {discoveredCount > 0 && (
              <button onClick={resetDiscoveries} className="obs-journal-reset-btn" title="Clear journal progress and rediscover all markers">
                <RotateCcw size={13} />
                <span>Reset Journal</span>
              </button>
            )}
            <button onClick={closeModal} className="btn-brass-primary" style={{ padding: '0.65rem 1.4rem' }}>
              <span>Return to Study</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
