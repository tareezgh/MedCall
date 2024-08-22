import { capitalizeFirstLetter } from "../utils/helpers";

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (status: string) => void;
  placeholder?: string;
  customClassName?: string;
}

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder,
  customClassName,
}: DropdownProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = (event.target as HTMLSelectElement).value;
    onChange(selectedValue);
  };

  return (
    <div
      className={`relative flex items-center justify-center w-full ${customClassName}`}
    >
      <select
        value={value}
        onChange={handleChange}
        className="
          bg-white text-secondary500 border border-secondary500 
          rounded-3xl py-2 px-4 pr-8 shadow-sm 
          focus:outline-none focus:ring-0  
           w-full cursor-pointer"
      >
        {placeholder && (
          <option value="" disabled selected={!value}>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {capitalizeFirstLetter(option)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
