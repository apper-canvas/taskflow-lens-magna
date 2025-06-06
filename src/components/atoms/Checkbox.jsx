import { motion } from 'framer-motion'
      import ApperIcon from '@/components/ApperIcon'

      const Checkbox = ({ checked, onChange, className = '', ...props }) => {
        return (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onChange}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all ${
              checked
                ? 'bg-primary border-primary'
                : 'border-surface-300 dark:border-surface-600 hover:border-primary'
            } ${className}`}
            {...props}
          >
            {checked && (
              <ApperIcon name="Check" size={14} className="text-white m-0.5" />
            )}
          </motion.button>
        )
      }

      export default Checkbox