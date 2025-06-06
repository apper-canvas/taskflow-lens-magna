import { useState, useMemo } from 'react'
      import { AnimatePresence } from 'framer-motion'
      import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'
      import SearchInput from '@/components/molecules/SearchInput'
      import Dropdown from '@/components/atoms/Dropdown'
      import TaskForm from '@/components/organisms/TaskForm'
      import TaskList from '@/components/organisms/TaskList'

      const MainContent = ({ 
        tasks = [], 
        lists = [], 
        selectedListId, 
        setSelectedListId,
        onTaskUpdate, 
        onTaskCreate, 
        onTaskDelete, 
        sidebarOpen, 
        setSidebarOpen
      }) => {
        const [searchQuery, setSearchQuery] = useState('')
        const [filterStatus, setFilterStatus] = useState('all')
        const [filterPriority, setFilterPriority] = useState('all')
        const [showTaskForm, setShowTaskForm] = useState(false)

        // Task form state
        const [taskForm, setTaskForm] = useState({
          title: '',
          description: '',
          listId: '',
          priority: 'medium',
          dueDate: ''
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

        const handleTaskSubmit = () => {
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

        const getListById = (listId) => lists.find(list => list.id === listId) || { name: 'Uncategorized', color: '#6B7280' }

        return (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header with Search and Filters */}
            <div className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="icon" 
                    onClick={() => setSidebarOpen(!sidebarOpen)} 
                    className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
                    icon="Menu"
                    iconSize={20}
                    iconClassName="text-surface-600 dark:text-surface-400"
                  />
                  <Text variant="h1">
                    {selectedListId === 'all' ? 'All Tasks' : getListById(selectedListId).name}
                  </Text>
                </div>
                
                <Button 
                  onClick={() => setShowTaskForm(true)} 
                  className="px-4 py-2"
                  icon="Plus"
                  iconSize={20}
                >
                  <span>Add Task</span>
                </Button>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex-1">
                  <SearchInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tasks..."
                  />
                </div>
                
                <Dropdown
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  options={[
                    { value: 'all', label: 'All Status' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'completed', label: 'Completed' }
                  ]}
                />

                <Dropdown
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  options={[
                    { value: 'all', label: 'All Priority' },
                    { value: 'high', label: 'High' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'low', label: 'Low' }
                  ]}
                />
              </div>
            </div>

            {/* Tasks Content */}
            <TaskList
              tasks={filteredTasks}
              onTaskToggle={onTaskUpdate}
              onTaskDelete={onTaskDelete}
              lists={lists}
              setShowTaskForm={setShowTaskForm}
              totalTasks={tasks.length}
            />

            {/* Task Form Modal */}
            <AnimatePresence>
              {showTaskForm && (
                <TaskForm 
                  show={showTaskForm}
                  onClose={() => setShowTaskForm(false)}
                  onSubmit={handleTaskSubmit}
                  taskForm={taskForm}
                  setTaskForm={setTaskForm}
                  lists={lists}
                />
              )}
            </AnimatePresence>
          </div>
        )
      }

      export default MainContent