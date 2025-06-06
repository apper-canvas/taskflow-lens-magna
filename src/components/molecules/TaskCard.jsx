import { motion } from 'framer-motion'
      import ApperIcon from '@/components/ApperIcon'
      import Checkbox from '@/components/atoms/Checkbox'
      import Text from '@/components/atoms/Text'
      import Card from '@/components/atoms/Card'
      import { format, isToday, isTomorrow, isPast } from 'date-fns'

      const TaskCard = ({ task, onTaskToggle, onTaskDelete, getPriorityColor, getListById, index }) => {
        const formatDueDate = (dateString) => {
          if (!dateString) return null
          const date = new Date(dateString)
          if (isToday(date)) return 'Today'
          if (isTomorrow(date)) return 'Tomorrow'
          return format(date, 'MMM d')
        }

        const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && !task.completed

        return (
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 hover:shadow-soft"
          >
            <div className="flex items-start space-x-4">
              <Checkbox checked={task.completed} onChange={() => onTaskToggle(task)} />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <Text variant="h3" className={task.completed ? 'line-through text-surface-500 dark:text-surface-500' : 'text-surface-800 dark:text-surface-200'}>
                    {task.title}
                  </Text>
                  <Button 
                    variant="icon" 
                    onClick={() => onTaskDelete(task.id)} 
                    className="p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900"
                    icon="Trash2"
                    iconSize={16}
                    iconClassName="text-red-500"
                  />
                </div>

                {task.description && (
                  <Text variant="small" className={`mb-3 ${task.completed ? 'line-through text-surface-400 dark:text-surface-600' : 'text-surface-600 dark:text-surface-400'}`}>
                    {task.description}
                  </Text>
                )}

                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  
                  {task.dueDate && (
                    <span className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full ${
                      isOverdue
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
          </Card>
        )
      }

      export default TaskCard