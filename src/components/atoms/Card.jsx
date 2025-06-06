import { motion } from 'framer-motion'

      const Card = ({ children, className = '', onClick, layout = true, ...props }) => {
        const baseClasses = 'bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl shadow-card transition-all duration-200'
        
        return (
          <motion.div
            layout={layout}
            className={`${baseClasses} ${className}`}
            onClick={onClick}
            {...props}
          >
            {children}
          </motion.div>
        )
      }

      export default Card