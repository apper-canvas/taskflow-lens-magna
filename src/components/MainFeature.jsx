import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, isToday, isTomorrow, isPast } from 'date-fns'
import ApperIcon from './ApperIcon'

const MainFeature = ({ 
  tasks = [], 
  lists = [], 
  onTaskUpdate, 
  onTaskCreate, 
  onTaskDelete, 
  onListCreate 
}) => {
  const [selectedListId, setSelectedListId] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showListForm, setShowListForm] = useState(false)
  const [draggedTask, setDraggedTask] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Task form state
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    listId: '',
    priority: 'medium',
    dueDate: ''
  })

  // List form state
  const [listForm, setListForm] = useState({
    name: '',
    color: '#3B82F6'
  })

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesList = selectedListId === 'all' || task.listId === selectedListId
      const matchesSearch = task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = filterStatus === 'all' || 
                           (filterStatus === 'completed' && task.completed) ||
                           (filterStatus === 'pending' && !task.completed)
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority

      return matchesList && matchesSearch && matchesStatus && matchesPriority
    })
  }, [tasks, selectedListId, searchQuery, filterStatus, filterPriority])

  const completedTasksCount = tasks.filter(task => task.completed).length
  const totalTasksCount = tasks.length
  const progressPercentage = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0

  const handleTaskSubmit = (e) => {
    e.preventDefault()
    if (!taskForm.title.trim()) return

    const newTask = {
      ...taskForm,
      listId: taskForm.listId || lists[0]?.id || 'default',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    onTaskCreate(newTask)
    setTaskForm({
      title: '',
      description: '',
      listId: '',
      priority: 'medium',
      dueDate: ''
    })
    setShowTaskForm(false)
  }

  const handleListSubmit = (e) => {
    e.preventDefault()
    if (!listForm.name.trim()) return

    const newList = {
      ...listForm,
      createdAt: new Date().toISOString()
    }

    onListCreate(newList)
    setListForm({ name: '', color: '#3B82F6' })
    setShowListForm(false)
  }

  const handleTaskToggle = (task) => {
    onTaskUpdate({
      ...task,
      completed: !task.completed,
      updatedAt: new Date().toISOString()
    })
  }

  const formatDueDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    return format(date, 'MMM d')
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      default: return 'bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300'
    }
  }

  const getListById = (listId) => lists.find(list => list.id === listId) || { name: 'Uncategorized', color: '#6B7280' }

  return (
    <div className="flex h-screen bg-surface-50 dark:bg-surface-900">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-80 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 flex flex-col"
          >
            <div className="p-6 border-b border-surface-200 dark:border-surface-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-200">
                  Lists
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowListForm(true)}
                  className="p-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
                >
                  <ApperIcon name="Plus" size={16} />
                </motion.button>
              </div>

              {/* Progress Ring */}
              <div className="flex items-center space-x-4 p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-surface-200 dark:text-surface-600"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray={`${progressPercentage}, 100`}
                      className="text-primary"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-surface-800 dark:text-surface-200">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-800 dark:text-surface-200">
                    {completedTasksCount} of {totalTasksCount}
                  </p>
                  <p className="text-xs text-surface-600 dark:text-surface-400">
                    tasks completed
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
              {/* All Tasks */}
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => setSelectedListId('all')}
                className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 transition-colors ${
                  selectedListId === 'all'
                    ? 'bg-primary text-white'
                    : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <ApperIcon name="List" size={20} />
                  <span className="font-medium">All Tasks</span>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-20">
                  {tasks.length}
                </span>
              </motion.button>

              {/* Lists */}
              {lists.map(list => {
                const listTaskCount = tasks.filter(task => task.listId === list.id).length
                return (
                  <motion.button
                    key={list.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedListId(list.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 transition-colors ${
                      selectedListId === list.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: list.color }}
                      />
                      <span className="font-medium">{list.name}</span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-20">
                      {listTaskCount}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with Search and Filters */}
        <div className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name="Menu" size={20} className="text-surface-600 dark:text-surface-400" />
              </motion.button>
              <h1 className="text-2xl font-bold text-surface-800 dark:text-surface-200">
                {selectedListId === 'all' ? 'All Tasks' : getListById(selectedListId).name}
              </h1>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTaskForm(true)}
              className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <ApperIcon name="Plus" size={20} />
              <span>Add Task</span>
            </motion.button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <ApperIcon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" 
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-800 dark:text-surface-200"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-800 dark:text-surface-200"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-800 dark:text-surface-200"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Tasks Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <ApperIcon name="CheckCircle2" size={64} className="text-surface-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-surface-600 dark:text-surface-400 mb-2">
                {tasks.length === 0 ? "No tasks yet" : "No tasks match your filters"}
              </h3>
              <p className="text-surface-500 dark:text-surface-500 mb-6">
                {tasks.length === 0 
                  ? "Create your first task to get started" 
                  : "Try adjusting your search or filters"
                }
              </p>
              {tasks.length === 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTaskForm(true)}
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Create Task
                </motion.button>
              )}
            </motion.div>
          ) : (
            <div className="grid gap-4">
              <AnimatePresence>
                {filteredTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                    className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl p-6 shadow-card hover:shadow-soft transition-all duration-200"
                  >
                    <div className="flex items-start space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleTaskToggle(task)}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all ${
                          task.completed
                            ? 'bg-primary border-primary'
                            : 'border-surface-300 dark:border-surface-600 hover:border-primary'
                        }`}
                      >
                        {task.completed && (
                          <ApperIcon name="Check" size={14} className="text-white m-0.5" />
                        )}
                      </motion.button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`font-semibold text-lg ${
                            task.completed 
                              ? 'line-through text-surface-500 dark:text-surface-500' 
                              : 'text-surface-800 dark:text-surface-200'
                          }`}>
                            {task.title}
                          </h3>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onTaskDelete(task.id)}
                            className="p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                          >
                            <ApperIcon name="Trash2" size={16} className="text-red-500" />
                          </motion.button>
                        </div>

                        {task.description && (
                          <p className={`text-sm mb-3 ${
                            task.completed 
                              ? 'line-through text-surface-400 dark:text-surface-600' 
                              : 'text-surface-600 dark:text-surface-400'
                          }`}>
                            {task.description}
                          </p>
                        )}

                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          
                          {task.dueDate && (
                            <span className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full ${
                              isPast(new Date(task.dueDate)) && !task.completed
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                : 'bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-400'
                            }`}>
                              <ApperIcon name="Calendar" size={12} />
                              <span>{formatDueDate(task.dueDate)}</span>
                            </span>
                          )}

                          <div className="flex items-center space-x-1 text-xs text-surface-500 dark:text-surface-500">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: getListById(task.listId).color }}
                            />
                            <span>{getListById(task.listId).name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Task Form Modal */}
      <AnimatePresence>
        {showTaskForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-xl p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200 mb-4">
                Create New Task
              </h3>
              
              <form onSubmit={handleTaskSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-surface-700 text-surface-800 dark:text-surface-200"
                    placeholder="Enter task title..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={taskForm.description}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-2 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-surface-700 text-surface-800 dark:text-surface-200"
                    placeholder="Enter description..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      List
                    </label>
                    <select
                      value={taskForm.listId}
                      onChange={(e) => setTaskForm(prev => ({ ...prev, listId: e.target.value }))}
                      className="w-full px-4 py-2 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-surface-700 text-surface-800 dark:text-surface-200"
                    >
                      <option value="">Select list</option>
                      {lists.map(list => (
                        <option key={list.id} value={list.id}>{list.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Priority
                    </label>
                    <select
                      value={taskForm.priority}
                      onChange={(e) => setTaskForm(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-4 py-2 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-surface-700 text-surface-800 dark:text-surface-200"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-4 py-2 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-surface-700 text-surface-800 dark:text-surface-200"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Create Task
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setShowTaskForm(false)}
                    className="flex-1 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300 py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List Form Modal */}
      <AnimatePresence>
        {showListForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-xl p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200 mb-4">
                Create New List
              </h3>
              
              <form onSubmit={handleListSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    List Name
                  </label>
                  <input
                    type="text"
                    value={listForm.name}
                    onChange={(e) => setListForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-surface-700 text-surface-800 dark:text-surface-200"
                    placeholder="Enter list name..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Color
                  </label>
                  <div className="flex space-x-2">
                    {['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'].map(color => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => setListForm(prev => ({ ...prev, color }))}
                        className={`w-8 h-8 rounded-full border-2 ${
                          listForm.color === color ? 'border-surface-800 dark:border-surface-200' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Create List
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setShowListForm(false)}
                    className="flex-1 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300 py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature