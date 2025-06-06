const ProgressRing = ({ percentage, className = '', ...props }) => {
        return (
          <div className={`relative w-16 h-16 ${className}`} {...props}>
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-surface-200 dark:text-surface-600"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${percentage}, 100`}
                className="text-primary"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-surface-800 dark:text-surface-200">
                {Math.round(percentage)}%
              </span>
            </div>
          </div>
        )
      }

      export default ProgressRing