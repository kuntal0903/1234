import { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useToast } from '../context/ToastContext';
import { Search, Bell, Sun, Moon, Menu, Clock } from 'lucide-react';

export default function Topbar({
  activePage,
  searchQuery,
  onSearchChange,
  onNavigate,
  onToggleSidebar,
  onToggleMobile,
  onOpenNotifications,
  onOpenStatusModal,
}) {
  const { theme, setTheme } = useTheme();
  const { addToast } = useToast();
  const [is24Hour, setIs24Hour] = useState(false);
  const [clockState, setClockState] = useState({ timeDigits: '', period: '' });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      if (is24Hour) {
        const hh = String(hours).padStart(2, '0');
        setClockState({
          timeDigits: `${hh}:${minutes}:${seconds}`,
          period: '24H'
        });
      } else {
        const h12 = hours % 12 || 12;
        const hh = String(h12).padStart(2, '0');
        const period = hours >= 12 ? 'PM' : 'AM';
        setClockState({
          timeDigits: `${hh}:${minutes}:${seconds}`,
          period
        });
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, [is24Hour]);

  const toggleClockFormat = () => {
    const nextFormat = !is24Hour;
    setIs24Hour(nextFormat);
    addToast(`Clock set to ${nextFormat ? '24-hour (21:02:16)' : '12-hour (09:02:16 PM)'} format`, 'info');
  };

  const toggleTheme = () => {
    let nextTheme = 'dark';
    if (theme === 'dark') nextTheme = 'light';
    else if (theme === 'light') nextTheme = 'blue';
    setTheme(nextTheme);
    addToast(`Switched workspace theme to ${nextTheme.toUpperCase()}`, 'info');
  };

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button
          className="topbar__menu-btn"
          onClick={onToggleMobile}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="topbar__search">
          <Search size={16} className="topbar__search-icon" />
          <input
            type="text"
            className="topbar__search-input"
            placeholder="Search assets, CVEs, IPs, domain targets..."
            value={searchQuery || ''}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
      </div>

      <div className="topbar__right">
        <div
          className="topbar__clock-pill clickable-row"
          onClick={toggleClockFormat}
          title={`Click to switch to ${is24Hour ? '12-hour AM/PM' : '24-hour'} format`}
        >
          <Clock size={15} color="var(--neon-cyan)" style={{ flexShrink: 0 }} />
          <span className="topbar__clock-time">{clockState.timeDigits}</span>
          <span className="topbar__clock-badge">{clockState.period}</span>
        </div>

        <button
          className="status-indicator-btn clickable-row"
          onClick={onOpenStatusModal}
          title="System Health Diagnostics (Click for System Status)"
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00e676', boxShadow: '0 0 10px #00e676', flexShrink: 0 }} />
          <span>Operational</span>
        </button>

        <button
          className="topbar__icon-btn"
          onClick={toggleTheme}
          title={`Current Theme: ${theme.toUpperCase()} (Click to toggle)`}
        >
          {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          className="topbar__icon-btn"
          onClick={onOpenNotifications}
          title="Notifications"
          style={{ position: 'relative' }}
        >
          <Bell size={18} />
          <span className="notif-badge-dot" />
        </button>

        <div className="topbar__profile" onClick={() => onNavigate('settings')} title="View Settings & Profile" style={{ cursor: 'pointer' }}>
          <div className="topbar__avatar">AD</div>
          <div className="topbar__user-info">
            <span className="topbar__user-name">Alex Dawson</span>
            <span className="topbar__user-role">SecOps Lead</span>
          </div>
        </div>
      </div>
    </header>
  );
}