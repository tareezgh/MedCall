interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  customClassName?: string;
}

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  leftIcon,
  rightIcon,
  onLeftIconClick,
  onRightIconClick,
  customClassName
}: InputProps) => {
  return (
    <>
      <div className={`relative flex items-center justify-center w-full`}>
        {leftIcon && (
          <span className="absolute left-5" onClick={onLeftIconClick}>
            {leftIcon}
          </span>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${customClassName} p-2 py-3 border border-secondary500 rounded-[50px] focus:outline-none focus:border-blue-500 w-full `}
          style={{
            paddingLeft: leftIcon ? "3.5rem" : "1rem",
            paddingRight: rightIcon ? "3.5rem" : "1rem",
          }}
        />
        {rightIcon && (
          <span className="absolute right-5 cursor-pointer" onClick={onRightIconClick}>
            {rightIcon}
          </span>
        )}
      </div>
    </>
  );
};

export default Input;
