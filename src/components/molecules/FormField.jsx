import Label from '@/components/atoms/Label'
      import Input from '@/components/atoms/Input'
      import Dropdown from '@/components/atoms/Dropdown'
      import ColorPicker from '@/components/molecules/ColorPicker'

      const FormField = ({ label, type, value, onChange, placeholder, options, required, rows, colors, inputType, ...props }) => {
        const renderInput = () => {
          switch (inputType) {
            case 'textarea':
              return (
                <Input
                  type="text"
                  value={value}
                  onChange={onChange}
                  placeholder={placeholder}
                  rows={rows}
                  {...props}
                />
              )
            case 'dropdown':
              return (
                <Dropdown
                  value={value}
                  onChange={onChange}
                  options={options}
                  {...props}
                />
              )
            case 'colorPicker':
              return (
                <ColorPicker
                  selectedColor={value}
                  onSelectColor={onChange}
                  colors={colors}
                  {...props}
                />
              )
            default:
              return (
                <Input
                  type={type}
                  value={value}
                  onChange={onChange}
                  placeholder={placeholder}
                  required={required}
                  {...props}
                />
              )
          }
        }

        return (
          <div>
            {label && <Label>{label}</Label>}
            {renderInput()}
          </div>
        )
      }

      export default FormField