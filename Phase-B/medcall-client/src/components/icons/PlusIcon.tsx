interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  onClick?: () => void;
  customClassName?: string;
}

const PlusIcon = ({
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
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${customClassName}`}
        onClick={onClick}
      >
        <path
          d="M18.75 7.5V28.5"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.25 18H29.25"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};

export default PlusIcon;
