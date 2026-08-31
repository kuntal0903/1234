import { Zap, AlertTriangle, ShieldAlert, Radio, ChevronRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const MOCK_THREATS = [
  { id: 't1', cveId: 'CVE-2024-3094', title: 'xz-utils Backdoor Active Exploitation', severity: 'Critical', cvssScore: 10.0, affectedAsset: 'api-prod-01.corp.internal', discoveredAt: '12m ago', description: 'Malicious code in xz-utils tarball payload leading to unauthenticated SSH authentication bypass.', remediation: 'Upgrade xz-utils library immediately to version 5.6.2 or higher.' },
  { id: 't2', cveId: 'CVE-2023-4863', title: 'Exposed PostgreSQL Port 5432 Ingress', severity: 'Critical', cvssScore: 9.8, affectedAsset: 'db-secondary.staging.net', discoveredAt: '45m ago', description: 'PostgreSQL database listener accessible from unauthenticated external IP addresses.', remediation: 'Restrict database listener IP bind configuration to private VPC subnet.' },
  { id: 't3', cveId: 'CVE-2023-38606', title: 'TLS 1.0 Enabled on Public Ingress Gateway', severity: 'High', cvssScore: 7.5, affectedAsset: 'gw-external.corp.internal', discoveredAt: '2h ago', description: 'Legacy cipher suite active allowing POODLE or BEAST MITM downgrade attacks.', remediation: 'Enforce minimum TLS version 1.2 or 1.3 on load balancer profile.' },
  { id: 't4', cveId: 'CVE-2023-22515', title: 'Expired Wildcard SSL Certificate', severity: 'High', cvssScore: 7.2, affectedAsset: '*.legacy.corp.internal', discoveredAt: '5h ago', description: 'Wildcard certificate expired causing SSL handshake warnings on staging environments.', remediation: 'Renew Let\'s Encrypt / ACME SSL certificate auto-renew bot script.' },
];

export default function ThreatFeed({ onSelectThreat }) {
  const { addToast } = useToast();

  const handleRefresh = () => {
    addToast('Fetched latest threat indicators from SOC threat intelligence database', 'info');
  };

  return (
    <div className="dash-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="dash-card__header">
        <h3 className="dash-card__title">
          <Zap size={18} color="var(--critical)" /> Live Threat Intelligence Feed
        </h3>
        <button className="dash-card__action" onClick={handleRefresh}>
          Refresh <ChevronRight size={14} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {MOCK_THREATS.map((t) => (
          <div
            key={t.id}
            className="dash-threat-item clickable-row"
            onClick={() => onSelectThreat?.(t)}
            style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'stretch' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className={`severity-badge ${t.severity.toLowerCase()}`}>{t.severity}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{t.title}</span>
              </div>
              <span className="cvss-pill">{t.cvssScore}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
              <span className="mono-cell">{t.affectedAsset}</span>
              <span>{t.discoveredAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}