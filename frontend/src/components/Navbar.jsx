import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useState } from 'react'
import '../styles/index.css'

export const LogoSVG = ({ size = 11 }) => (
  <svg viewBox="0 0 13 13" fill="none" width={size} height={size}>
    <path d="M2 6.5L5.5 10L11 3" stroke="#050709" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate         = useNavigate()
  const location         = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/') }
  const isActive = (path) => location.pathname === path

  const initial = user?.username?.charAt(0).toUpperCase() || '?'

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="nav-logo">
        <div className="logo-box">
          <LogoSVG size={11} />
        </div>
        <span className="logo-task">TaskVertex</span>
      </Link>

      {/* Desktop links */}
      <div className="nav-links">
        <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
          Dashboard
        </Link>
        <Link to="/tasks" className={`nav-link ${isActive('/tasks') ? 'active' : ''}`}>
          My Tasks
        </Link>
      </div>

      {/* Right side — avatar + username + logout */}
      <div className="nav-right">
        <div className="nav-avatar">{initial}</div>
        <span className="nav-user">{user?.username}</span>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>

      {/* Mobile hamburger */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span /><span /><span />
      </button>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/tasks"     onClick={() => setMenuOpen(false)}>My Tasks</Link>
          <span className="nav-user-mobile">Logged in as {user?.username}</span>
          <button className="btn-logout-mobile" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  )
}