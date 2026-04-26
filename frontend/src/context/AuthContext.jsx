import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null)   // { username, token }
  const [ready, setReady] = useState(false)  // has localStorage been read?

  // On first load, restore session from localStorage
  useEffect(() => {
    const token    = localStorage.getItem('tf_token')
    const username = localStorage.getItem('tf_username')
    if (token && username) {
      setUser({ token, username })
    }
    setReady(true)
  }, [])

  const login = (username, token) => {
    localStorage.setItem('tf_token', token)
    localStorage.setItem('tf_username', username)
    setUser({ username, token })
  }

  const logout = () => {
    localStorage.removeItem('tf_token')
    localStorage.removeItem('tf_username')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, ready }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook — use this instead of useContext(AuthContext) everywhere
export function useAuth() {
  return useContext(AuthContext)
}
