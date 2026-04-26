import api from './axiosConfig'

/**
 * Get all tasks (optionally filtered)
 * GET /api/tasks
 * GET /api/tasks?status=TODO
 * GET /api/tasks?priority=HIGH
 */
export const getTasks = async (filters = {}) => {
  const params = {}
  if (filters.status   && filters.status   !== 'ALL') params.status   = filters.status
  if (filters.priority && filters.priority !== 'ALL') params.priority = filters.priority
  const response = await api.get('/api/tasks', { params })
  return response.data  // array of tasks
}

/**
 * Get dashboard summary counts
 * GET /api/tasks/summary
 * Returns: { total, inProgress, done, overdue }
 */
export const getTaskSummary = async () => {
  const response = await api.get('/api/tasks/summary')
  return response.data
}

/**
 * Create a new task
 * POST /api/tasks
 * Body: { title, description, priority, dueDate, status }
 */
export const createTask = async (taskData) => {
  const response = await api.post('/api/tasks', taskData)
  return response.data
}

/**
 * Update an existing task
 * PUT /api/tasks/{id}
 * Body: { title, description, priority, dueDate, status }
 */
export const updateTask = async (id, taskData) => {
  const response = await api.put(`/api/tasks/${id}`, taskData)
  return response.data
}

/**
 * Delete a task
 * DELETE /api/tasks/{id}
 */
export const deleteTask = async (id) => {
  await api.delete(`/api/tasks/${id}`)
}
