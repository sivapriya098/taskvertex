import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { login as loginAPI } from '../services/authService'
 
export default function LoginPage() {
  const { login }  = useAuth()
  const navigate   = useNavigate()

  const [form, setForm]       = useState({ email: '', password: '' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email.trim() || !form.password.trim()) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    try {
      const data = await loginAPI(form.email, form.password)
      // data = { token: "...", email: "..." }
      login(data.name, data.token)
      navigate('/dashboard')
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid email or password.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-glow-a" />
      <div className="auth-glow-b" />

      <div className="auth-box">
        {/* Logo */}
        <div className="auth-logo">
          <div className="logo-box">
            <svg viewBox="0 0 13 13" fill="none" width="13" height="13">
              <path d="M2 6.5L5.5 10L11 3" stroke="#050709" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="auth-logo-text">TaskVertex</span>
        </div>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">
          Don't have an account? <Link to="/register">Sign up free →</Link>
        </p>

        <form onSubmit={handleSubmit}>
          {error && <div className="form-error">⚠ {error}</div>}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="text"
              name="email"
              placeholder="your_email"
              value={form.email}
              onChange={handleChange}
              autoFocus
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn-submit btn-full"
            disabled={loading}
            style={{marginTop: '8px'}}
          >
            {loading ? 'Logging in...' : 'Log in →'}
          </button>
        </form>

        <div className="auth-divider" style={{marginTop: '20px'}}>
          <Link to="/" style={{color:'var(--muted)', fontSize:'13px'}}>← Back to home</Link>
        </div>
      </div>
    </div>
  )
}
