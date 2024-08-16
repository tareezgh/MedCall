interface ButtonProps {
  text: string;
  type: "primary" | "secondary";
  onClick: () => void;
  customClassName?: string;
  disabled?: boolean;
}

const Button = ({
  text,
  type,
  onClick,
  customClassName,
  disabled = false,
}: ButtonProps) => {
  const buttonStyle = `${
    type == "primary"
      ? "bg-primary500 text-textColor hover:bg-primary600"
      : "border border-secondary500 text-secondary500 hover:bg-secondary600 hover:text-textColor"
  }`;

  const disabledStyle = "opacity-50 cursor-not-allowed";

  return (
    <>
      <button
        className={`${buttonStyle} ${customClassName} flex items-center justify-center px-6 py-3 rounded-3xl ${
          disabled ? disabledStyle : ""
        }`}
        onClick={() => {
          if (!disabled) {
            onClick();
          }
        }}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
