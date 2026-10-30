import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';
import './MusicWidget.css';

interface Track {
  title: string;
  artist: string;
  bpm: number;
}

export const MusicWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<number | null>(null);

  const playlist: Track[] = [
    { title: 'Morning Study & Lo-Fi Waves', artist: 'Andrei Besañez Studio', bpm: 72 },
    { title: 'Late Night Synthesis', artist: 'Chamber Acoustics', bpm: 64 },
    { title: 'Coffee & Code Cadence', artist: 'Minimalist Session', bpm: 80 }
  ];

  const currentTrack = playlist[currentTrackIndex];

  // Ambient gentle chord generator using Web Audio API (Clean, legal, zero external audio dependency)
  const playLoFiChords = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const chords = [
        [261.63, 329.63, 392.00, 523.25], // Cmaj7
        [220.00, 261.63, 329.63, 440.00], // Am7
        [174.61, 220.00, 261.63, 349.23], // Fmaj7
        [196.00, 246.94, 293.66, 392.00]  // G7
      ];
      let step = 0;

      const scheduleStep = () => {
        if (!audioCtxRef.current || isMuted) return;
        const now = audioCtxRef.current.currentTime;
        const currentChord = chords[step % chords.length];

        currentChord.forEach((freq) => {
          if (!audioCtxRef.current) return;
          const osc = audioCtxRef.current.createOscillator();
          const gain = audioCtxRef.current.createGain();

          osc.type = 'triangle'; // Warm, soft lo-fi timbre
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.exponentialRampToValueAtTime(0.025, now + 0.3);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

          osc.connect(gain);
          gain.connect(audioCtxRef.current.destination);

          osc.start(now);
          osc.stop(now + 2.3);
        });

        step++;
      };

      scheduleStep();
      const intervalMs = (60 / currentTrack.bpm) * 4000;
      synthTimerRef.current = window.setInterval(scheduleStep, intervalMs);
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  };

  const stopAudio = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playLoFiChords();
    }
  };

  const nextTrack = () => {
    stopAudio();
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    if (isPlaying) {
      setTimeout(playLoFiChords, 200);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <aside className="music-widget-wrapper" aria-label="Lo-fi Background Music Player">
      {/* Pill Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`music-dock-pill ${isPlaying ? 'playing' : ''}`}
        aria-expanded={isExpanded}
        aria-label="Toggle music player dock"
      >
        <span className={`music-note-icon ${isPlaying ? 'spin-anim' : ''}`}>
          <Music size={14} />
        </span>
        <span className="music-label-text">
          {isPlaying ? '♫ playing' : '♫ music'}
        </span>
        <span className="music-caret">{isExpanded ? '▾' : '‹'}</span>
      </button>

      {/* Expanded Control Window */}
      {isExpanded && (
        <div className="music-popover-card">
          <div className="music-card-header">
            <span className="music-album-tag">LO-FI AMBIENCE</span>
            <span className="music-bpm">{currentTrack.bpm} BPM</span>
          </div>

          <div className="music-track-info">
            <h4 className="music-track-title">{currentTrack.title}</h4>
            <p className="music-track-artist">{currentTrack.artist}</p>
          </div>

          {/* Sound Wave Animation Visualizer */}
          <div className={`music-visualizer ${isPlaying && !isMuted ? 'active' : ''}`}>
            <span className="wave-bar bar-1" />
            <span className="wave-bar bar-2" />
            <span className="wave-bar bar-3" />
            <span className="wave-bar bar-4" />
            <span className="wave-bar bar-5" />
          </div>

          {/* Player Buttons */}
          <div className="music-controls-row">
            <button
              onClick={toggleMute}
              className="music-ctrl-btn"
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <button
              onClick={togglePlay}
              className="music-play-btn"
              title={isPlaying ? 'Pause' : 'Play Lo-Fi Ambient Audio'}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? <Pause size={17} /> : <Play size={17} />}
            </button>

            <button
              onClick={nextTrack}
              className="music-ctrl-btn"
              title="Next Track"
              aria-label="Next track"
            >
              <SkipForward size={16} />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
