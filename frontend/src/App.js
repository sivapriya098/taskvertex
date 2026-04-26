import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

import LandingPage   from './pages/LandingPage.jsx'
import LoginPage     from './pages/LoginPage.jsx'
import RegisterPage  from './pages/RegisterPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import TaskListPage  from './pages/TaskListPage.jsx'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/"          element={<LandingPage />} />
          <Route path="/login"     element={<LoginPage />} />
          <Route path="/register"  element={<RegisterPage />} />

          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tasks"     element={<TaskListPage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
