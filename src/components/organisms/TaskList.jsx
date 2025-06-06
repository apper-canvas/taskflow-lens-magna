import { motion, AnimatePresence } from 'framer-motion'
      import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'
      import TaskCard from '@/components/molecules/TaskCard'

      const TaskList = ({ tasks, onTaskToggle, onTaskDelete, lists, setShowTaskForm, totalTasks }) => {
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
          <div className="flex-1 overflow-y-auto p-6">
            {tasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <ApperIcon name="CheckCircle2" size={64} className="text-surface-300 mx-auto mb-4" />
                <Text variant="h3" className="text-surface-600 dark:text-surface-400 mb-2">
                  {totalTasks === 0 ? "No tasks yet" : "No tasks match your filters"}
                </Text>
                <Text variant="info" className="mb-6">
                  {totalTasks === 0 
                    ? "Create your first task to get started" 
                    : "Try adjusting your search or filters"
                  }
                </Text>
                {totalTasks === 0 && (
                  <Button 
                    onClick={() => setShowTaskForm(true)} 
                    className="px-6 py-3"
                  >
                    Create Task
                  </Button>
                )}
              </motion.div>
            ) : (
              <div className="grid gap-4">
                <AnimatePresence>
                  {tasks.map((task, index) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onTaskToggle={onTaskToggle}
                      onTaskDelete={onTaskDelete}
                      getPriorityColor={getPriorityColor}
                      getListById={getListById}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )
      }

      export default TaskList