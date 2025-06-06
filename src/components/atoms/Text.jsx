const Text = ({ children, variant = 'body', className = '', ...props }) => {
        let classes = ''
        switch (variant) {
          case 'h1':
            classes = 'text-2xl font-bold text-surface-800 dark:text-surface-200'
            break
          case 'h2':
            classes = 'text-lg font-semibold text-surface-800 dark:text-surface-200'
            break
          case 'h3':
            classes = 'font-semibold text-lg'
            break
          case 'body':
            classes = 'text-surface-600 dark:text-surface-400'
            break
          case 'small':
            classes = 'text-sm'
            break
          case 'xs':
            classes = 'text-xs'
            break
          case 'error':
            classes = 'text-red-500'
            break
          case 'info':
            classes = 'text-surface-500 dark:text-surface-500'
            break
          case 'strong':
            classes = 'font-medium'
            break
          default:
            classes = 'text-base'
        }

        const Tag = variant.startsWith('h') ? variant : 'p'

        return <Tag className={`${classes} ${className}`} {...props}>{children}</Tag>
      }

      export default Text