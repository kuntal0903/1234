import { FileText, Download } from 'lucide-react';

export default function ExportCard({ title, description, onExport }) {
  return (
    <div className="dash-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <FileText size={22} color="var(--neon-blue)" />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h4>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{description}</p>
        </div>
      </div>
      <button className="export-btn btn--primary" onClick={onExport}>
        <Download size={14} /> Export
      </button>
    </div>
  );
}