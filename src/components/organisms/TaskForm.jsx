import { motion } from 'framer-motion'
      import FormField from '@/components/molecules/FormField'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'

      const TaskForm = ({ show, onClose, onSubmit, taskForm, setTaskForm, lists }) => {
        const handleFormSubmit = (e) => {
          e.preventDefault()
          onSubmit()
        }

        if (!show) return null

        return (
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
              <Text variant="h2" className="mb-4">Create New Task</Text>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <FormField
                  label="Title"
                  type="text"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter task title..."
                  required
                />

                <FormField
                  label="Description"
                  inputType="textarea"
                  value={taskForm.description}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter description..."
                  rows={3}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="List"
                    inputType="dropdown"
                    value={taskForm.listId}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, listId: e.target.value }))}
                    options={[
                      { value: '', label: 'Select list' },
                      ...lists.map(list => ({ value: list.id, label: list.name }))
                    ]}
                  />

                  <FormField
                    label="Priority"
                    inputType="dropdown"
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, priority: e.target.value }))}
                    options={[
                      { value: 'low', label: 'Low' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' }
                    ]}
                  />
                </div>

                <FormField
                  label="Due Date"
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, dueDate: e.target.value }))}
                />

                <div className="flex space-x-3 pt-4">
                  <Button type="submit" className="flex-1">
                    Create Task
                  </Button>
                  <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )
      }

      export default TaskForm