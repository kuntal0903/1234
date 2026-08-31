import { useState } from 'react';
import { Bell, X, ShieldAlert, AlertTriangle, Check, Trash2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const INITIAL_NOTIFS = [
  { id: 'n1', title: 'Critical Vulnerability Discovered', desc: 'CVE-2024-3094 detected on api-prod-01', time: '10m ago', unread: true, type: 'critical' },
  { id: 'n2', title: 'Port Exposure Warning', desc: 'PostgreSQL port 5432 exposed on dev-db.internal', time: '45m ago', unread: true, type: 'high' },
  { id: 'n3', title: 'Domain Scan Completed', desc: 'Scan finished for acme-corp.com (1,428 assets verified)', time: '2h ago', unread: false, type: 'info' },
];

export default function NotificationsPanel({ isOpen, onClose, onNavigate, onOpenModal }) {
  const { addToast } = useToast();
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);

  if (!isOpen) return null;

  const handleMarkAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
    addToast('Marked all notifications as read', 'info');
  };

  const handleClearAll = () => {
    setNotifs([]);
    addToast('Cleared all notifications', 'info');
  };

  return (
    <>
      <div className="notif-overlay" onClick={onClose} />
      <div className="notif-panel" role="dialog" aria-label="Notifications panel">
        <div className="notif-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Bell size={18} color="var(--neon-blue)" />
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Security Alerts</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close notifications">
            <X size={16} />
          </button>
        </div>

        <div className="notif-actions" style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
          <button className="dash-card__action" onClick={handleMarkAllRead} style={{ fontSize: 11 }}>
            <Check size={12} /> Mark Read
          </button>
          <button className="dash-card__action" onClick={handleClearAll} style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            <Trash2 size={12} /> Clear All
          </button>
        </div>

        <div className="notif-body">
          {notifs.map((n) => (
            <div
              key={n.id}
              className={`notif-item ${n.unread ? 'unread' : ''}`}
              onClick={() => {
                onClose();
                if (n.type === 'critical' || n.type === 'high') {
                  onOpenModal?.('vulnerability', {
                    id: n.id,
                    cveId: 'CVE-2024-3094',
                    title: n.title,
                    severity: n.type === 'critical' ? 'Critical' : 'High',
                    cvssScore: 10.0,
                    affectedAsset: 'api-prod-01.corp.internal',
                    description: n.desc,
                    remediation: 'Apply vendor patch or isolate endpoint immediately.'
                  });
                } else {
                  onNavigate?.('vulnerabilities');
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className={`severity-badge ${n.type}`}>{n.type}</span>
                <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{n.time}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>{n.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{n.desc}</div>
            </div>
          ))}
          {notifs.length === 0 && (
            <div style={{ padding: 30, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
              No notifications to display.
            </div>
          )}
        </div>
      </div>
    </>
  );
}