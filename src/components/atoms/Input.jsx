import ApperIcon from '@/components/ApperIcon'

      const Input = ({ 
        type = 'text', 
        value, 
        onChange, 
        placeholder, 
        className = '', 
        icon: Icon, 
        rows, 
        required, 
        ...props 
      }) => {
        const baseClasses = 'w-full px-4 py-2 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-surface-700 text-surface-800 dark:text-surface-200'
        const inputClasses = Icon ? 'pl-10 pr-4' : ''

        const inputElement = rows ? (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`${baseClasses} ${className}`}
            {...props}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`${baseClasses} ${inputClasses} ${className}`}
            {...props}
          />
        )

        return (
          <div className="relative">
            {Icon && (
              <ApperIcon 
                name={Icon} 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" 
              />
            )}
            {inputElement}
          </div>
        )
      }

      export default Input