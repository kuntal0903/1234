import { Zap, X, ShieldAlert, AlertTriangle, ExternalLink } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function ThreatModal({ threat, onClose }) {
  const { addToast } = useToast();

  if (!threat) return null;

  const handleMitigate = () => {
    addToast(`Automated firewall isolation rule dispatched for ${threat.title}`, 'success');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <div className="modal-title-group">
            <Zap size={22} color="var(--critical)" />
            <div>
              <h2 className="modal-title">{threat.title}</h2>
              <span className="modal-subtitle mono-cell">{threat.cveId} · {threat.discoveredAt}</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-grid-2">
            <div className="modal-info-box">
              <span className="modal-label">Threat Severity</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <span className={`severity-badge ${threat.severity?.toLowerCase()}`}>{threat.severity}</span>
                <span className="cvss-pill">{threat.cvssScore}</span>
              </div>
            </div>

            <div className="modal-info-box">
              <span className="modal-label">Affected Surface Target</span>
              <div className="mono-cell" style={{ marginTop: 4, fontWeight: 700, color: 'var(--neon-cyan)' }}>
                {threat.affectedAsset}
              </div>
            </div>
          </div>

          <div className="modal-info-box">
            <span className="modal-label">Threat Intelligence Analysis</span>
            <p className="modal-desc">{threat.description}</p>
          </div>

          <div className="modal-info-box alert-box">
            <span className="modal-label" style={{ color: 'var(--neon-cyan)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <AlertTriangle size={14} /> Immediate Mitigation Advisory
            </span>
            <p className="modal-desc" style={{ color: 'var(--text-primary)', marginTop: 4 }}>
              {threat.remediation}
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="export-btn" onClick={() => addToast('Pushed SOC alert feed to Slack / PagerDuty', 'info')}>
            <ExternalLink size={14} /> Notify SOC
          </button>
          <button className="export-btn btn--primary" onClick={handleMitigate}>
            <ShieldAlert size={14} /> Apply Firewall Isolation Rule
          </button>
        </div>
      </div>
    </div>
  );
}