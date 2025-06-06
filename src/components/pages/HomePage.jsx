import { useState, useEffect, useMemo } from 'react'
      import { toast } from 'react-toastify'
      import { motion, AnimatePresence } from 'framer-motion'
      import ApperIcon from '@/components/ApperIcon'
      import taskService from '@/services/api/taskService'
      import listService from '@/services/api/listService'
      import ListForm from '@/components/organisms/ListForm'
      import SidebarItem from '@/components/molecules/SidebarItem'
      import MainContent from '@/components/organisms/MainContent'
      import Text from '@/components/atoms/Text'
      import Button from '@/components/atoms/Button'
      import ProgressRing from '@/components/atoms/ProgressRing'

      const HomePage = () => {
        const [darkMode, setDarkMode] = useState(false)
        const [tasks, setTasks] = useState([])
        const [lists, setLists] = useState([])
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)
        const [selectedListId, setSelectedListId] = useState('all')
        const [showListForm, setShowListForm] = useState(false)
        const [sidebarOpen, setSidebarOpen] = useState(true)

        // List form state
        const [listForm, setListForm] = useState({
          name: '',
          color: '#3B82F6'
        })

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

        const completedTasksCount = tasks.filter(task => task.completed).length
        const totalTasksCount = tasks.length
        const progressPercentage = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0

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
                <Text variant="h2" className="mb-2">Something went wrong</Text>
                <Text>{error}</Text>
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
                  <Text variant="h1">TaskFlow</Text>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="icon" 
                    onClick={toggleDarkMode} 
                    className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
                    icon={darkMode ? "Sun" : "Moon"}
                    iconSize={20}
                    iconClassName="text-surface-600 dark:text-surface-400"
                  />
                </div>
              </div>
            </header>

            {/* Main Content Area */}
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
                        <Text variant="h2">Lists</Text>
                        <Button 
                          variant="icon" 
                          onClick={() => setShowListForm(true)} 
                          className="p-2 rounded-lg bg-primary text-white hover:bg-primary-dark"
                          icon="Plus"
                          iconSize={16}
                        />
                      </div>

                      {/* Progress Ring */}
                      <div className="flex items-center space-x-4 p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                        <ProgressRing percentage={progressPercentage} />
                        <div>
                          <Text variant="small" className="font-medium text-surface-800 dark:text-surface-200">
                            {completedTasksCount} of {totalTasksCount}
                          </Text>
                          <Text variant="xs" className="text-surface-600 dark:text-surface-400">
                            tasks completed
                          </Text>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
                      {/* All Tasks */}
                      <SidebarItem
                        icon="List"
                        text="All Tasks"
                        count={tasks.length}
                        onClick={() => setSelectedListId('all')}
                        isSelected={selectedListId === 'all'}
                      />

                      {/* Lists */}
                      {lists.map(list => {
                        const listTaskCount = tasks.filter(task => task.listId === list.id).length
                        return (
                          <SidebarItem
                            key={list.id}
                            color={list.color}
                            text={list.name}
                            count={listTaskCount}
                            onClick={() => setSelectedListId(list.id)}
                            isSelected={selectedListId === list.id}
                          />
                        )
                      })}
                    </div>
                  </motion.aside>
                )}
              </AnimatePresence>

              {/* Main Content */}
              <MainContent 
                tasks={tasks}
                lists={lists}
                selectedListId={selectedListId}
                setSelectedListId={setSelectedListId}
                onTaskUpdate={handleTaskUpdate}
                onTaskCreate={handleTaskCreate}
                onTaskDelete={handleTaskDelete}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            </div>

            {/* List Form Modal */}
            <AnimatePresence>
              {showListForm && (
                <ListForm 
                  show={showListForm}
                  onClose={() => setShowListForm(false)}
                  onSubmit={handleListCreate}
                  listForm={listForm}
                  setListForm={setListForm}
                />
              )}
            </AnimatePresence>
          </div>
        )
      }

      export default HomePage