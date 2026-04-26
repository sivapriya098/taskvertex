import api from './axiosConfig'

/**
 * Register a new user
 * POST /api/auth/register
 * Body: { username, email, password }
 * Returns: { message } or throws on error
 */
export const register = async (username, email, password) => {
  const response = await api.post('/api/auth/register', { name:username, email, password })
  return response.data
}

/**
 * Login an existing user
 * POST /api/auth/login
 * Body: { email, password }
 * Returns: { token, email } or throws on error
 */
export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password })
  return response.data  // expects { token: "...", email: "..." }
}
