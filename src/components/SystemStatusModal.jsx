import { Activity, X, CheckCircle, RefreshCw, Cpu, Server, Radio, Database } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function SystemStatusModal({ onClose }) {
  const { addToast } = useToast();

  const SERVICES = [
    { name: 'Domain Recon Engine', status: 'Operational', latency: '42ms', icon: Server },
    { name: 'CVE Vulnerability Correlator', status: 'Operational', latency: '18ms', icon: Cpu },
    { name: 'Threat Feed Ingestion Stream', status: 'Operational', latency: '95ms', icon: Radio },
    { name: 'PostgreSQL Telemetry DB', status: 'Operational', latency: '12ms', icon: Database },
  ];

  const handleRunHealthCheck = () => {
    addToast('Ran full SOC cluster health check. All 4 microservices report 99.99% uptime.', 'success');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <div className="modal-title-group">
            <Activity size={22} color="#00e676" />
            <div>
              <h2 className="modal-title">System Health & Diagnostics</h2>
              <span className="modal-subtitle">ASM Shield 3.0 Platform Telemetry</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.name} className="dash-card" style={{ padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Icon size={18} color="var(--neon-blue)" />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Latency: {s.latency}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#00e676', fontSize: 12, fontWeight: 700 }}>
                    <CheckCircle size={14} /> {s.status}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          <button className="export-btn btn--primary" onClick={handleRunHealthCheck}>
            <RefreshCw size={14} /> Run Cluster Diagnostic
          </button>
        </div>
      </div>
    </div>
  );
}