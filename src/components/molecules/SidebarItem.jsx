import { motion } from 'framer-motion'
      import ApperIcon from '@/components/ApperIcon'
      import Text from '@/components/atoms/Text'

      const SidebarItem = ({ icon, text, count, onClick, isSelected, color, ...props }) => {
        return (
          <motion.button
            whileHover={{ x: 4 }}
            onClick={onClick}
            className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 transition-colors ${
              isSelected
                ? 'bg-primary text-white'
                : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
            }`}
            {...props}
          >
            <div className="flex items-center space-x-3">
              {icon && <ApperIcon name={icon} size={20} />}
              {color && <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />}
              <Text variant="strong">{text}</Text>
            </div>
            {count !== undefined && (
              <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-20">
                {count}
              </span>
            )}
          </motion.button>
        )
      }

      export default SidebarItem