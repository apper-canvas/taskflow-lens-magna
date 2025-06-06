import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="mb-8"
        >
          <ApperIcon name="FileQuestion" size={80} className="text-surface-400 mx-auto" />
        </motion.div>
        
        <h1 className="text-4xl font-bold text-surface-800 dark:text-surface-200 mb-4">
          404
        </h1>
        <p className="text-lg text-surface-600 dark:text-surface-400 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <ApperIcon name="Home" size={20} />
            <span>Go Home</span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound