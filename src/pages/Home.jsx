import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import taskService from '../services/api/taskService'
import listService from '../services/api/listService'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [tasks, setTasks] = useState([])
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [tasksResult, listsResult] = await Promise.all([
          taskService.getAll(),
          listService.getAll()
        ])
        setTasks(tasksResult || [])
        setLists(listsResult || [])
      } catch (err) {
        setError(err.message)
        toast.error("Failed to load data")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleTaskUpdate = async (updatedTask) => {
    try {
      const result = await taskService.update(updatedTask.id, updatedTask)
      setTasks(prev => prev.map(task => 
        task.id === updatedTask.id ? result : task
      ))
      toast.success("Task updated successfully")
    } catch (err) {
      toast.error("Failed to update task")
    }
  }

  const handleTaskCreate = async (newTask) => {
    try {
      const result = await taskService.create(newTask)
      setTasks(prev => [...prev, result])
      toast.success("Task created successfully")
    } catch (err) {
      toast.error("Failed to create task")
    }
  }

  const handleTaskDelete = async (taskId) => {
    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(task => task.id !== taskId))
      toast.success("Task deleted successfully")
    } catch (err) {
      toast.error("Failed to delete task")
    }
  }

  const handleListCreate = async (newList) => {
    try {
      const result = await listService.create(newList)
      setLists(prev => [...prev, result])
      toast.success("List created successfully")
    } catch (err) {
      toast.error("Failed to create list")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-200 mb-2">
            Something went wrong
          </h2>
          <p className="text-surface-600 dark:text-surface-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      {/* Header */}
      <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-surface-800 dark:text-surface-200">
              TaskFlow
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
            >
              <ApperIcon 
                name={darkMode ? "Sun" : "Moon"} 
                size={20} 
                className="text-surface-600 dark:text-surface-400" 
              />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <MainFeature 
          tasks={tasks}
          lists={lists}
          onTaskUpdate={handleTaskUpdate}
          onTaskCreate={handleTaskCreate}
          onTaskDelete={handleTaskDelete}
          onListCreate={handleListCreate}
        />
      </main>
    </div>
  )
}

export default Home