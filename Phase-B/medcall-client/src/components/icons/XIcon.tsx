interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  onClick?: () => void;
  customClassName?: string;
}
const XIcon = ({
  width = 24,
  height = 24,
  color = "#3C4B78",
  onClick,
  customClassName,
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={customClassName}
      onClick={onClick}
    >
      <g clip-path="url(#clip0_1_7025)">
        <path d="M24 0H0V24H24V0Z" fill="white" fill-opacity="0.01" />
        <path
          d="M4 4L20 20"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 20L20 4"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_7025">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default XIcon;
