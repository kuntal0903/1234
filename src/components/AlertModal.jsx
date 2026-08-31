import { Bell, X, Check, ShieldAlert } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function AlertModal({ alert, onClose }) {
  const { addToast } = useToast();

  if (!alert) return null;

  const handleAcknowledge = () => {
    addToast(`Acknowledged alert: ${alert.title}`, 'success');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <div className="modal-title-group">
            <Bell size={22} color="var(--neon-blue)" />
            <div>
              <h2 className="modal-title">{alert.title}</h2>
              <span className="modal-subtitle">{alert.time}</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-info-box">
            <span className="modal-label">Alert Severity</span>
            <div style={{ marginTop: 4 }}>
              <span className={`severity-badge ${alert.type?.toLowerCase()}`}>{alert.type}</span>
            </div>
          </div>

          <div className="modal-info-box">
            <span className="modal-label">Notification Message</span>
            <p className="modal-desc">{alert.message}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="export-btn btn--primary" onClick={handleAcknowledge}>
            <Check size={14} /> Acknowledge Alert
          </button>
        </div>
      </div>
    </div>
  );
}