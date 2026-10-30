import React from 'react';
import { Laptop } from 'lucide-react';
import './Gear.css';

interface GearCategory {
  category: string;
  items: {
    name: string;
    description: string;
    tag: string;
  }[];
}

export const Gear: React.FC = () => {
  const gearList: GearCategory[] = [
    {
      category: 'Workstation & Hardware',
      items: [
        {
          name: 'Primary Development Machine',
          description: 'Windows 11 64-bit Workstation powered by multi-core CPU & fast NVMe SSD storage.',
          tag: 'Daily Driver'
        },
        {
          name: 'High-Refresh IPS Display',
          description: 'Calibrated color gamut for UI/UX wireframing, dual-screen multitasking, and documentation review.',
          tag: 'Peripherals'
        },
        {
          name: 'Tactile Mechanical Keyboard',
          description: 'Ergonomic mechanical switches tuned for high WPM accuracy and long programming sessions.',
          tag: 'Typing'
        }
      ]
    },
    {
      category: 'Software & Environment',
      items: [
        {
          name: 'Visual Studio Code',
          description: 'Configured with custom minimalist theme, Prettier, ESLint, GitLens, and Tailwind CSS IntelliSense.',
          tag: 'Editor'
        },
        {
          name: 'PowerShell 7 & Windows Terminal',
          description: 'Fast CLI development with Oh-My-Posh prompts and Git status branch indicators.',
          tag: 'Terminal'
        },
        {
          name: 'Postman & DBeaver / pgAdmin',
          description: 'API inspection, database query profiling, and PostgreSQL schema management.',
          tag: 'Database & API'
        }
      ]
    }
  ];

  return (
    <section id="gear" className="workspace-section">
      <div className="workspace-content-container">
        
        {/* Header */}
        <div className="section-head-row">
          <div>
            <div className="section-tag">
              <Laptop size={13} />
              <span>Gear & Studio</span>
            </div>
            <h2 className="section-title">Hardware, Peripherals & Daily Tools</h2>
          </div>
        </div>

        {/* Gear Grid */}
        <div className="gear-groups-stack">
          {gearList.map((group) => (
            <div key={group.category} className="gear-group">
              <h3 className="gear-group-heading">{group.category}</h3>
              <div className="gear-items-grid">
                {group.items.map((item, idx) => (
                  <div
                    key={item.name}
                    className="gear-item-card"
                    data-lag={0.05 * (idx + 1)}
                  >
                    <div className="gear-item-top">
                      <h4 className="gear-item-name">{item.name}</h4>
                      <span className="gear-tag-pill">{item.tag}</span>
                    </div>
                    <p className="gear-item-desc">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
