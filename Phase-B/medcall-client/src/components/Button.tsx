import logo from "../../assets/logo-img.webp";

interface ButtonProps {
  text: string;
  type: "primary" | "secondary";
  onClick: () => void;
}

const Button = ({ text, type, onClick }: ButtonProps) => {
  const buttonStyle = `${
    type == "primary"
      ? "bg-primary500 text-textColor hover:bg-primary600"
      : "border border-secondary500 text-secondary500 hover:bg-secondary600 hover:text-textColor"
  }`;
  return (
    <>
      <button
        className={`${buttonStyle} flex items-center justify-center px-6 py-3 rounded-3xl`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
