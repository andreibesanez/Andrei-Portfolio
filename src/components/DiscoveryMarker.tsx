import React from 'react';
import { useDiscovery, DISCOVERIES } from '../context/DiscoveryContext';
import './DiscoveryMarker.css';

interface DiscoveryMarkerProps {
  id: string;
  className?: string;
  label?: string;
}

export const DiscoveryMarker: React.FC<DiscoveryMarkerProps> = ({ id, className = '', label }) => {
  const { discoverMarker, isDiscovered } = useDiscovery();
  const item = DISCOVERIES.find((d) => d.id === id);

  if (!item) return null;

  const discovered = isDiscovered(id);

  return (
    <button
      onClick={() => discoverMarker(id)}
      className={`obs-discovery-marker ${discovered ? 'discovered' : 'undiscovered'} ${className}`}
      title={discovered ? `Review Observation: ${item.title}` : 'Uncalibrated Celestial Seal • Click to record observation'}
      aria-label={`Celestial observation marker: ${item.title}`}
    >
      <div className="obs-marker-ring" />
      <div className="obs-marker-glyph">
        <span>{item.symbol}</span>
      </div>
      {label && <span className="obs-marker-text">{label}</span>}
      <span className="obs-marker-tooltip">
        {discovered ? `Recorded: ${item.title}` : '✦ Record Observation'}
      </span>
    </button>
  );
};
