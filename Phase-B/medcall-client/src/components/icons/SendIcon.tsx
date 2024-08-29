interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  onClick?: () => void;
  customClassName?: string;
}
const SendIcon = ({
  width = 56,
  height = 56,
  color = "#3C4B78",
  onClick,
  customClassName,
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 56 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={customClassName}
      onClick={onClick}
    >
      <rect width={width} height={height} rx="28" fill="#E5E5FE" />
      <path
        d="M41.3337 16.6666L26.667 31.3333"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32.0003 43.3333L41.3337 16.6666L14.667 26L26.667 31.3333L32.0003 43.3333Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default SendIcon;
