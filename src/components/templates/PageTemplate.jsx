const PageTemplate = ({ header, sidebar, mainContent, modals }) => {
        return (
          <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
            {header}
            <div className="flex h-screen bg-surface-50 dark:bg-surface-900">
              {sidebar}
              {mainContent}
            </div>
            {modals}
          </div>
        )
      }

      export default PageTemplate