import React from 'react';
import { Award, ExternalLink, CheckCircle } from 'lucide-react';
import './Certificates.css';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  category: string;
}

export const Certificates: React.FC = () => {
  const certs: Certificate[] = [
    {
      id: 'cert-1',
      title: 'PostgreSQL Relational Database Administration & Design',
      issuer: 'Technical Certification Institute',
      date: '2025',
      credentialId: 'PG-SQL-98214',
      verifyUrl: '#',
      category: 'Database Architecture'
    },
    {
      id: 'cert-2',
      title: 'Full-Stack JavaScript & Modern React Applications',
      issuer: 'Web Engineering Academy',
      date: '2024',
      credentialId: 'REACT-FS-33109',
      verifyUrl: '#',
      category: 'Frontend Engineering'
    },
    {
      id: 'cert-3',
      title: 'Stellar & Soroban Smart Contracts Fundamentals',
      issuer: 'Stellar Development Community',
      date: '2024',
      credentialId: 'XLM-SOROBAN-410',
      verifyUrl: '#',
      category: 'Blockchain'
    }
  ];

  return (
    <section id="certificates" className="workspace-section">
      <div className="workspace-content-container">
        
        {/* Header */}
        <div className="section-head-row">
          <div>
            <div className="section-tag">
              <Award size={13} />
              <span>Certificates</span>
            </div>
            <h2 className="section-title">Verified Credentials & Academic Honors</h2>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="certificates-grid">
          {certs.map((c, idx) => (
            <div
              key={c.id}
              className="cert-card"
              data-speed={idx % 2 === 0 ? '1.03' : '0.98'}
              data-lag={0.06 * (idx + 1)}
            >
              <div className="cert-card-top">
                <span className="cert-category-badge">{c.category}</span>
                <span className="cert-date">{c.date}</span>
              </div>

              <h3 className="cert-title">{c.title}</h3>
              <p className="cert-issuer">{c.issuer}</p>

              <div className="cert-footer">
                <div className="cert-credential-id">
                  <CheckCircle size={13} className="cert-check" />
                  <span>ID: {c.credentialId}</span>
                </div>

                <a
                  href={c.verifyUrl}
                  onClick={(e) => {
                    if (c.verifyUrl === '#') {
                      e.preventDefault();
                      alert(`Verified Credential: ${c.credentialId} issued by ${c.issuer}. Formal verification transcript available on request.`);
                    }
                  }}
                  className="cert-verify-link"
                >
                  <span>Verify</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
