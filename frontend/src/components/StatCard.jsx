/**
 * StatCard — shows a single stat on the dashboard
 * Props: label, value, icon, color ('lime' | 'blue' | 'green' | 'red')
 */
export default function StatCard({ label, value, icon, color = 'lime' }) {
  return (
    <div className={`stat-card stat-card--${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">{value ?? '—'}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
