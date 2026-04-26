import { useState, useEffect } from 'react'
import Navbar   from '../components/Navbar.jsx'
import TaskForm from '../components/TaskForm.jsx'
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService'
import '../styles/TaskList.css'

export default function TaskListPage() {
  const [tasks, setTasks]             = useState([])
  const [loading, setLoading]         = useState(true)
  const [formOpen, setFormOpen]       = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [saving, setSaving]           = useState(false)
  const [toast, setToast]             = useState(null)
  const [search, setSearch]           = useState('')
  const [filters, setFilters]         = useState({ status: 'ALL', priority: 'ALL' })

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const loadTasks = async () => {
    setLoading(true)
    try {
      const data = await getTasks(filters)
      setTasks(data)
    } catch {
      showToast('Failed to load tasks.', 'error')
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { loadTasks() }, [filters])

  const handleFilterChange = (key, value) =>
    setFilters(prev => ({ ...prev, [key]: value }))

  const openCreate = () => { setEditingTask(null); setFormOpen(true) }
  const openEdit   = (task) => { setEditingTask(task); setFormOpen(true) }
  const closeForm  = () => { setFormOpen(false); setEditingTask(null) }

  const handleSubmit = async (formData) => {
    setSaving(true)
    try {
      if (editingTask) {
        await updateTask(editingTask.id, formData)
        showToast('Task updated ✓')
      } else {
        await createTask(formData)
        showToast('Task created ✓')
      }
      closeForm()
      loadTasks()
    } catch {
      showToast(editingTask ? 'Update failed.' : 'Create failed.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return
    try {
      await deleteTask(id)
      showToast('Task deleted.')
      loadTasks()
    } catch {
      showToast('Delete failed.', 'error')
    }
  }

  // Client-side search filter
  const visibleTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    (t.description || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page-shell">
      <Navbar />

      <main className="page-content">
        {/* Header */}
        <div className="tl-header">
          <div>
            <h1 className="tl-title">All Tasks</h1>
            <p className="tl-sub">Full task list with search, filter by status &amp; priority, and action buttons</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="tl-toolbar">
          <div className="tl-search-wrap">
            <span className="tl-search-icon">🔍</span>
            <input
              className="tl-search"
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <select
            className="tl-select"
            value={filters.status}
            onChange={e => handleFilterChange('status', e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>

          <select
            className="tl-select"
            value={filters.priority}
            onChange={e => handleFilterChange('priority', e.target.value)}
          >
            <option value="ALL">All Priority</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <button className="tl-add-btn" onClick={openCreate}>
            + Add Task
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="spinner-wrap"><div className="spinner" /></div>
        ) : visibleTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <div className="empty-title">No tasks found</div>
            <div className="empty-desc">Try adjusting your search or filters.</div>
          </div>
        ) : (
          <div className="tl-table-wrap">
            <table className="tl-table">
              <thead>
                <tr>
                  <th>TASK TITLE</th>
                  <th>STATUS</th>
                  <th>PRIORITY</th>
                  <th>DUE DATE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {visibleTasks.map(task => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {formOpen && (
        <TaskForm
          initialData={editingTask}
          onSubmit={handleSubmit}
          onClose={closeForm}
          loading={saving}
        />
      )}

      {toast && (
        <div className={`toast toast--${toast.type}`}>
          {toast.type === 'success' ? '✅' : '❌'} {toast.msg}
        </div>
      )}
    </div>
  )
}

/* ── Inline row component ── */
function TaskRow({ task, onEdit, onDelete }) {
  const isOverdue =
    task.dueDate &&
    task.status !== 'DONE' &&
    new Date(task.dueDate) < new Date()

  const formatDate = (d) => {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  }

  const statusMeta = {
    TODO:        { label: 'Todo',        cls: 'status--todo' },
    IN_PROGRESS: { label: 'In Progress', cls: 'status--in-progress' },
    DONE:        { label: 'Done ✓',      cls: 'status--done' },
  }[task.status] || { label: task.status, cls: '' }

  const priorityMeta = {
    HIGH:   { label: 'High',   cls: 'pri--high' },
    MEDIUM: { label: 'Medium', cls: 'pri--medium' },
    LOW:    { label: 'Low',    cls: 'pri--low' },
  }[task.priority] || { label: task.priority, cls: '' }

  return (
    <tr className={task.status === 'DONE' ? 'row--done' : ''}>
      <td className="td-title">
        <div className="td-title-main">{task.title}</div>
        {task.description && (
          <div className="td-title-sub">{task.description}</div>
        )}
      </td>
      <td>
        <span className={`tl-badge ${statusMeta.cls}`}>{statusMeta.label}</span>
      </td>
      <td>
        <span className={`tl-badge ${priorityMeta.cls}`}>{priorityMeta.label}</span>
      </td>
      <td className={`td-date ${isOverdue ? 'td-date--overdue' : ''}`}>
        {isOverdue && <span className="overdue-icon">⚠</span>}
        {formatDate(task.dueDate)}
      </td>
      <td>
        <div className="tl-actions">
          <button className="tl-btn-edit"   onClick={() => onEdit(task)}>Edit</button>
          <button className="tl-btn-delete" onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      </td>
    </tr>
  )
}
