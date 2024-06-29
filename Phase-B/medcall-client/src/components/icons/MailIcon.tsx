interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  onClick?: () => void;
  customClassName?: string;
}

const MailIcon = ({
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
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${customClassName}`}
        onClick={onClick}
      >
        <path
          d="M26.6667 5.83325H5.33341C3.86675 5.83325 2.66675 7.03325 2.66675 8.49992V24.4999C2.66675 25.9666 3.86675 27.1666 5.33341 27.1666H26.6667C28.1334 27.1666 29.3334 25.9666 29.3334 24.4999V8.49992C29.3334 7.03325 28.1334 5.83325 26.6667 5.83325Z"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M29.3334 8.5L16.0001 17.8333L2.66675 8.5"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};

export default MailIcon;
