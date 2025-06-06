import tasksData from '../mockData/tasks.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Local storage key
const STORAGE_KEY = 'taskflow_tasks'

// Get tasks from localStorage or use mock data
const getTasks = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : [...tasksData]
}

// Save tasks to localStorage
const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

const taskService = {
  async getAll() {
    await delay(300)
    return getTasks()
  },

  async getById(id) {
    await delay(200)
    const tasks = getTasks()
    const task = tasks.find(t => t.id === id)
    if (!task) {
      throw new Error('Task not found')
    }
    return { ...task }
  },

  async create(taskData) {
    await delay(400)
    const tasks = getTasks()
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    tasks.push(newTask)
    saveTasks(tasks)
    return { ...newTask }
  },

  async update(id, updates) {
    await delay(300)
    const tasks = getTasks()
    const index = tasks.findIndex(t => t.id === id)
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    const updatedTask = {
      ...tasks[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    tasks[index] = updatedTask
    saveTasks(tasks)
    return { ...updatedTask }
  },

  async delete(id) {
    await delay(250)
    const tasks = getTasks()
    const filteredTasks = tasks.filter(t => t.id !== id)
    if (filteredTasks.length === tasks.length) {
      throw new Error('Task not found')
    }
    saveTasks(filteredTasks)
    return { success: true }
  }
}

export default taskService