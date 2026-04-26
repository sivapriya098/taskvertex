import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register as registerAPI } from '../services/authService'

export default function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm]       = useState({ username: '', email: '', password: '', confirm: '' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
      setError('All fields are required.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      await registerAPI(form.username, form.email, form.password)
      // Registration successful → send to login
      navigate('/login', { state: { registered: true } })
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Try a different username.'
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

        <h1 className="auth-title">Create your account</h1>
        <p className="auth-sub">
          Already have one? <Link to="/login">Log in →</Link>
        </p>

        <form onSubmit={handleSubmit}>
          {error && <div className="form-error">⚠ {error}</div>}

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              className="form-input"
              type="text"
              name="username"
              placeholder="your_username"
              value={form.username}
              onChange={handleChange}
              autoFocus
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              className="form-input"
              type="password"
              name="confirm"
              placeholder="Re-enter password"
              value={form.confirm}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="btn-submit btn-full"
            disabled={loading}
            style={{marginTop: '8px'}}
          >
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>

        <div style={{marginTop: '18px', textAlign:'center'}}>
          <Link to="/" style={{color:'var(--muted)', fontSize:'13px'}}>← Back to home</Link>
        </div>
      </div>
    </div>
  )
}
