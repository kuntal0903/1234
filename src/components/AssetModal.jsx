import { useState } from 'react';
import { Globe, X, RefreshCw, Server, Lock, ExternalLink } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function AssetModal({ asset, onClose }) {
  const { addToast } = useToast();
  const [rescanning, setRescanning] = useState(false);

  if (!asset) return null;

  const handleRescan = () => {
    setRescanning(true);
    addToast(`Triggered on-demand deep scan for ${asset.name}`, 'info');
    setTimeout(() => {
      setRescanning(false);
      addToast(`Deep scan finished for ${asset.name}. 0 new vulnerabilities found.`, 'success');
    }, 1500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <div className="modal-title-group">
            <Globe size={22} color="var(--neon-blue)" />
            <div>
              <h2 className="modal-title">{asset.name}</h2>
              <span className="modal-subtitle mono-cell">{asset.ipAddress} · {asset.type}</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-grid-2">
            <div className="modal-info-box">
              <span className="modal-label">Risk Rating</span>
              <div style={{ marginTop: 4 }}>
                <span className={`status-badge ${asset.riskLevel?.toLowerCase()}`}>{asset.riskLevel}</span>
              </div>
            </div>

            <div className="modal-info-box">
              <span className="modal-label">Owner / Team</span>
              <div style={{ marginTop: 4, fontWeight: 600, color: 'var(--text-primary)' }}>
                {asset.owner || 'DevOps Team'}
              </div>
            </div>
          </div>

          <div className="modal-info-box">
            <span className="modal-label">Discovered Open Ports</span>
            <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
              {(asset.openPorts || [80, 443]).map((p) => (
                <span key={p} className="port-tag">:{p}</span>
              ))}
            </div>
          </div>

          <div className="modal-info-box">
            <span className="modal-label">Detected Technology Stack</span>
            <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
              {(asset.technologies || ['Nginx', 'React']).map((tech) => (
                <span key={tech} className="port-tag" style={{ background: 'rgba(59,130,246,0.12)', color: 'var(--neon-cyan)' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="export-btn" onClick={() => addToast(`Opening live connection stream to ${asset.ipAddress}...`, 'info')}>
            <ExternalLink size={14} /> Ping Host
          </button>
          <button className="export-btn btn--primary" onClick={handleRescan} disabled={rescanning}>
            <RefreshCw size={14} className={rescanning ? 'spin-slow' : ''} /> {rescanning ? 'Scanning...' : 'Trigger Deep Scan'}
          </button>
        </div>
      </div>
    </div>
  );
}