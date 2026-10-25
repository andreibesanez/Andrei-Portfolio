import React, { createContext, useContext, useState, useEffect } from 'react';

export interface DiscoveryItem {
  id: string;
  title: string;
  location: string;
  section: string;
  insight: string;
  symbol: string;
}

export const DISCOVERIES: DiscoveryItem[] = [
  {
    id: 'obs-zenith-01',
    title: 'The Catalyst of Inquiry',
    location: 'Hero • Intro & Zenith',
    section: 'Section I',
    symbol: '✦',
    insight: 'My passion for software began with a fascination for how code bridges abstract ideas into practical tools. Growing up and studying in Digos City, that curiosity transformed into a pursuit of accessible, responsive web development.'
  },
  {
    id: 'obs-study-02',
    title: 'Autodidactic Scholarship',
    location: "About • The Scholar's Study",
    section: 'Section II',
    symbol: '✧',
    insight: 'At Cor Jesu College, I learned that university courses provide the coordinates, but self-directed curiosity drives the expedition. I treat system architecture and typography as complementary disciplines of clarity.'
  },
  {
    id: 'obs-skills-03',
    title: 'Instruments as Precision Lenses',
    location: 'Skills • Scientific Instruments',
    section: 'Section III',
    symbol: '✣',
    insight: 'Whether drafting clean CSS variables or structuring relational SQL schemas, I believe code should never be divorced from user experience. Every framework is simply a lens to organize complexity for people.'
  },
  {
    id: 'obs-folio-04',
    title: 'Decentralized Auditability',
    location: 'Projects • The Project Folio',
    section: 'Section IV',
    symbol: '✵',
    insight: 'Working on Chainbudget and 4Ps-Nexus demonstrated how blockchain ledgers can solve real public transparency challenges in the Philippines. As student capstones, they represent our drive to build verifiable, tamper-proof systems.'
  },
  {
    id: 'obs-chronicle-05',
    title: 'The Capstone Blueprint',
    location: 'Experience • The Chronicle',
    section: 'Section V',
    symbol: '❂',
    insight: 'Serving as the Documentation Specialist for our capstone taught me that code without rigorous system blueprints is an uncalibrated instrument. Thorough documentation preserves technical intent for peers and future maintainers.'
  }
];

interface DiscoveryContextType {
  discoveredIds: string[];
  discoverMarker: (id: string) => void;
  isDiscovered: (id: string) => boolean;
  totalCount: number;
  discoveredCount: number;
  activeDiscovery: DiscoveryItem | null;
  setActiveDiscovery: (item: DiscoveryItem | null) => void;
  isJournalOpen: boolean;
  setIsJournalOpen: (open: boolean) => void;
  resetDiscoveries: () => void;
  allUnlocked: boolean;
  toastMessage: string | null;
}

const DiscoveryContext = createContext<DiscoveryContextType | undefined>(undefined);

const STORAGE_KEY = 'andrei_observatory_discoveries_v1';

export const DiscoveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [discoveredIds, setDiscoveredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeDiscovery, setActiveDiscovery] = useState<DiscoveryItem | null>(null);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(discoveredIds));
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [discoveredIds]);

  const discoverMarker = (id: string) => {
    const item = DISCOVERIES.find((d) => d.id === id);
    if (!item) return;

    if (!discoveredIds.includes(id)) {
      const updated = [...discoveredIds, id];
      setDiscoveredIds(updated);
      setToastMessage(`✦ OBSERVATION RECORDED • ${item.title} (${updated.length} of ${DISCOVERIES.length})`);
      setTimeout(() => setToastMessage(null), 4500);
    }

    setActiveDiscovery(item);
  };

  const isDiscovered = (id: string) => discoveredIds.includes(id);

  const resetDiscoveries = () => {
    setDiscoveredIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setToastMessage('Celestial journal reset. You may now rediscover all 5 observations.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const allUnlocked = discoveredIds.length === DISCOVERIES.length;

  return (
    <DiscoveryContext.Provider
      value={{
        discoveredIds,
        discoverMarker,
        isDiscovered,
        totalCount: DISCOVERIES.length,
        discoveredCount: discoveredIds.length,
        activeDiscovery,
        setActiveDiscovery,
        isJournalOpen,
        setIsJournalOpen,
        resetDiscoveries,
        allUnlocked,
        toastMessage
      }}
    >
      {children}
    </DiscoveryContext.Provider>
  );
};

export const useDiscovery = () => {
  const context = useContext(DiscoveryContext);
  if (!context) {
    throw new Error('useDiscovery must be used within a DiscoveryProvider');
  }
  return context;
};
