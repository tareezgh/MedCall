interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  onClick?: () => void;
  customClassName?: string;
}

const PinIcon = ({
  width = 24,
  height = 24,
  color = "#3C4B78",
  onClick,
  customClassName,
}: IconProps) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${customClassName}`}
        onClick={onClick}
      >
        <path
          d="M12 3.75C9.1084 3.75 6.75 6.1084 6.75 9C6.75 11.6367 8.71289 13.8135 11.25 14.1797V21H12.75V14.1797C15.2871 13.8135 17.25 11.6367 17.25 9C17.25 6.1084 14.8916 3.75 12 3.75ZM12 5.25C14.0801 5.25 15.75 6.91992 15.75 9C15.75 11.0801 14.0801 12.75 12 12.75C9.91992 12.75 8.25 11.0801 8.25 9C8.25 6.91992 9.91992 5.25 12 5.25ZM12 6C10.3506 6 9 7.35059 9 9H10.5C10.5 8.16211 11.1621 7.5 12 7.5V6Z"
          fill={color}
        />
      </svg>
    </>
  );
};

export default PinIcon;
