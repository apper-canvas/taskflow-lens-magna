import { motion } from 'framer-motion'

      const ColorPicker = ({ selectedColor, onSelectColor, colors }) => {
        return (
          <div className="flex space-x-2">
            {colors.map(color => (
              <motion.button
                key={color}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => onSelectColor(color)}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color ? 'border-surface-800 dark:border-surface-200' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )
      }

      export default ColorPicker