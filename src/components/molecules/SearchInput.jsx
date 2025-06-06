import Input from '@/components/atoms/Input'

      const SearchInput = ({ value, onChange, placeholder }) => {
        return (
          <Input
            type="text"
            icon="Search"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        )
      }

      export default SearchInput