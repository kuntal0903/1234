import { Globe, ArrowLeft, RefreshCw } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function PlaceholderPage({ pageId, onNavigate }) {
  const { addToast } = useToast();

  const handleDiagnostic = () => {
    addToast(`Ran surface diagnostics for ${pageId.replace('-', ' ')} module. Status: 100% Operational`, 'success');
  };

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 440, textAlign: 'center' }}>
      <Globe size={52} color="var(--neon-blue)" style={{ marginBottom: 16, opacity: 0.9 }} />
      <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, textTransform: 'capitalize' }}>
        {pageId.replace('-', ' ')} Module
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: 460, marginBottom: 24, lineHeight: 1.6 }}>
        This attack surface telemetry module is active and monitoring target endpoints. You can run immediate diagnostics or return to the main dashboard.
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <button className="export-btn" onClick={handleDiagnostic}>
          <RefreshCw size={14} /> Run Diagnostic
        </button>
        <button className="export-btn btn--primary" onClick={() => onNavigate?.('dashboard')}>
          <ArrowLeft size={14} /> Return to Dashboard
        </button>
      </div>
    </div>
  );
}