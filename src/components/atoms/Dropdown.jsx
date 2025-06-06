const Dropdown = ({ value, onChange, options, className = '', ...props }) => {
        return (
          <select
            value={value}
            onChange={onChange}
            className={`px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-800 dark:text-surface-200 ${className}`}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      }

      export default Dropdown