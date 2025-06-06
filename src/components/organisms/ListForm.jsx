import { motion } from 'framer-motion'
      import FormField from '@/components/molecules/FormField'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'

      const ListForm = ({ show, onClose, onSubmit, listForm, setListForm }) => {
        const availableColors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899']

        const handleFormSubmit = (e) => {
          e.preventDefault()
          onSubmit(listForm)
          setListForm({ name: '', color: '#3B82F6' })
          onClose()
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
              <Text variant="h2" className="mb-4">Create New List</Text>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <FormField
                  label="List Name"
                  type="text"
                  value={listForm.name}
                  onChange={(e) => setListForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter list name..."
                  required
                />

                <FormField
                  label="Color"
                  inputType="colorPicker"
                  value={listForm.color}
                  onChange={(color) => setListForm(prev => ({ ...prev, color }))}
                  colors={availableColors}
                />

                <div className="flex space-x-3 pt-4">
                  <Button type="submit" className="flex-1">
                    Create List
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

      export default ListForm