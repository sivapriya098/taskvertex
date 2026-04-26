import { useState, useEffect } from 'react'

/**
 * TaskForm — modal for creating or editing a task
 * Props:
 *   initialData  — task object when editing, null when creating
 *   onSubmit(data) — called with form data
 *   onClose()    — called to dismiss modal
 *   loading      — disables submit button while API call is in flight
 */
export default function TaskForm({ initialData, onSubmit, onClose, loading }) {
  const [form, setForm] = useState({
    title:       '',
    description: '',
    priority:    'MEDIUM',
    status:      'TODO',
    dueDate:     '',
  })
  const [error, setError] = useState('')

  // Pre-fill fields when editing
  useEffect(() => {
    if (initialData) {
      setForm({
        title:       initialData.title       || '',
        description: initialData.description || '',
        priority:    initialData.priority    || 'MEDIUM',
        status:      initialData.status      || 'TODO',
        dueDate:     initialData.dueDate     ? initialData.dueDate.slice(0, 10) : '',
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Task title is required.')
      return
    }
    onSubmit({
      ...form,
      dueDate: form.dueDate || null,
    })
  }

  return (
    /* Backdrop */
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{initialData ? 'Edit Task' : 'New Task'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          {error && <div className="form-error">{error}</div>}

          {/* Title */}
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              className="form-input"
              type="text"
              name="title"
              placeholder="What needs to be done?"
              value={form.title}
              onChange={handleChange}
              autoFocus
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-input form-textarea"
              name="description"
              placeholder="Optional details..."
              value={form.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          {/* Priority + Status row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select className="form-input form-select" name="priority" value={form.priority} onChange={handleChange}>
                <option value="HIGH">🔴 High</option>
                <option value="MEDIUM">🟡 Medium</option>
                <option value="LOW">🟢 Low</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-input form-select" name="status" value={form.status} onChange={handleChange}>
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>
          </div>

          {/* Due date */}
          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input
              className="form-input"
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <div className="form-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Saving...' : initialData ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
