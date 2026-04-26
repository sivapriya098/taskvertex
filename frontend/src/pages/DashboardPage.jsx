import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import StatCard from '../components/StatCard.jsx'
import { getTaskSummary, getTasks, updateTask, deleteTask } from '../services/taskService'
import '../styles/Dashboard.css'

export default function DashboardPage() {
  
  const [summary, setSummary]         = useState(null)
  const [recentTasks, setRecentTasks] = useState([])
  const [loading, setLoading]         = useState(true)
  const [toast, setToast]             = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const loadData = async () => {
    setLoading(true)
    try {
      const [sum, tasks] = await Promise.all([getTaskSummary(), getTasks()])
      setSummary(sum)
      setRecentTasks(tasks.slice(0, 5))
    } catch {
      showToast('Failed to load dashboard data.', 'error')
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { loadData() }, [])

  const handleStatusChange = async (id, newStatus) => {
    try {
      const task = recentTasks.find(t => t.id === id)
      await updateTask(id, { ...task, status: newStatus })
      showToast('Task updated ✓')
      loadData()
    } catch {
      showToast('Update failed.', 'error')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return
    try {
      await deleteTask(id)
      showToast('Task deleted.')
      loadData()
    } catch {
      showToast('Delete failed.', 'error')
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  }

  const isOverdue = (task) =>
    task.dueDate && task.status !== 'DONE' && new Date(task.dueDate) < new Date()

  const statusLabel = { TODO: 'Todo', IN_PROGRESS: 'In Progress', DONE: 'Done' }
  const priorityLabel = { HIGH: 'High', MEDIUM: 'Medium', LOW: 'Low' }
  const nextStatus = { TODO: 'IN_PROGRESS', IN_PROGRESS: 'DONE', DONE: 'TODO' }

  return (
    <div className="page-shell">
      <Navbar />

      <main className="page-content">

        {/* Page heading */}
        <div className="dash-heading">
          <h1>Dashboard</h1>
          <p>Track your progress, stay on top of deadlines, and keep things moving.</p>
        </div>

        {loading ? (
          <div className="spinner-wrap"><div className="spinner" /></div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="stats-grid">
              <StatCard icon="📋" value={summary?.total}      label="Total Tasks" />
              <StatCard icon="⏳" value={summary?.inProgress} label="In Progress" />
              <StatCard icon="✅" value={summary?.done}        label="Completed"   />
              <StatCard icon="🔴" value={summary?.overdue}     label="Overdue"     color="overdue" />
            </div>

            {/* Recent Tasks Table */}
            <div className="recent-section">
              <div className="recent-header">
                <h2 className="recent-title">Recent Tasks</h2>
                <Link to="/tasks" className="view-all-link">View all →</Link>
              </div>

              {recentTasks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📋</div>
                  <div className="empty-title">No tasks yet</div>
                  <div className="empty-desc">Head over to My Tasks to add your first one.</div>
                  <Link to="/tasks" className="btn-primary">Go to Tasks →</Link>
                </div>
              ) : (
                <div className="task-table-wrap">
                  <table className="task-table">
                    <thead>
                      <tr>
                        <th>TASK</th>
                        <th>STATUS</th>
                        <th>PRIORITY</th>
                        <th>DUE DATE</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTasks.map(task => (
                        <tr key={task.id}>
                          <td>
                            <div className="task-name">{task.title}</div>
                            {task.description && (
                              <div className="task-sub">{task.description}</div>
                            )}
                          </td>
                          <td>
                            <span className={`tbl-badge tbl-status--${task.status.toLowerCase().replace('_', '-')}`}>
                              {statusLabel[task.status] || task.status}
                            </span>
                          </td>
                          <td>
                            <span className={`tbl-badge tbl-priority--${task.priority?.toLowerCase()}`}>
                              {priorityLabel[task.priority] || task.priority}
                            </span>
                          </td>
                          <td className={isOverdue(task) ? 'due-overdue' : 'due-normal'}>
                            {formatDate(task.dueDate)}
                          </td>
                          <td>
                            <div className="tbl-actions">
                              <button
                                className="tbl-btn"
                                onClick={() => handleStatusChange(task.id, nextStatus[task.status])}
                                title="Change status"
                              >
                                {task.status === 'DONE' ? '↩' : task.status === 'TODO' ? '▶' : '✓'}
                              </button>
                              <button
                                className="tbl-btn tbl-btn--delete"
                                onClick={() => handleDelete(task.id)}
                                title="Delete"
                              >
                                🗑
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {toast && (
        <div className={`toast toast--${toast.type}`}>
          {toast.type === 'success' ? '✅' : '❌'} {toast.msg}
        </div>
      )}
    </div>
  )
}