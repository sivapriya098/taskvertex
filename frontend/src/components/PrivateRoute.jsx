import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

/**
 * Wraps protected routes.
 * If no JWT token in context → redirect to /login.
 * Shows nothing until AuthContext has finished reading localStorage (ready=true).
 */
export default function PrivateRoute() {
  const { user, ready } = useAuth()

  // Wait until localStorage has been read — avoids flash redirect on refresh
  if (!ready) return null

  return user ? <Outlet /> : <Navigate to="/login" replace />
}
    