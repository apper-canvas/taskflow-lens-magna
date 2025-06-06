import { motion } from 'framer-motion'

      const Button = ({ children, onClick, className = '', variant = 'primary', type = 'button', icon: Icon, iconSize, ...props }) => {
        const baseClasses = 'flex items-center justify-center space-x-2 rounded-lg font-medium transition-colors'
        let variantClasses = ''

        switch (variant) {
          case 'primary':
            variantClasses = 'bg-primary hover:bg-primary-dark text-white'
            break
          case 'secondary':
            variantClasses = 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300'
            break
          case 'danger':
            variantClasses = 'bg-red-500 hover:bg-red-600 text-white'
            break
          case 'icon':
            variantClasses = 'p-2'
            break
          default:
            variantClasses = 'bg-primary hover:bg-primary-dark text-white'
        }

        return (
          <motion.button
            whileHover={{ scale: variant === 'icon' ? 1.05 : 1.02 }}
            whileTap={{ scale: variant === 'icon' ? 0.95 : 0.98 }}
            onClick={onClick}
            type={type}
            className={`${baseClasses} ${variantClasses} ${className}`}
            {...props}
          >
            {Icon && <Icon size={iconSize} />}
            {children}
          </motion.button>
        )
      }

      export default Button