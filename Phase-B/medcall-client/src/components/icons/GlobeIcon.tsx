interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  onClick?: () => void;
  customClassName?: string;
}

const GlobeIcon = ({
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
        <g clip-path="url(#clip0_276_2323)">
          <path
            d="M10.0003 18.3334C14.6027 18.3334 18.3337 14.6025 18.3337 10.0001C18.3337 5.39771 14.6027 1.66675 10.0003 1.66675C5.39795 1.66675 1.66699 5.39771 1.66699 10.0001C1.66699 14.6025 5.39795 18.3334 10.0003 18.3334Z"
            stroke={color}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1.66699 10H18.3337"
            stroke={color}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.3337 10.0001C13.2693 6.91011 12.0847 3.94871 10.0003 1.66675C7.91593 3.94871 6.73136 6.91011 6.66699 10.0001C6.73136 13.0901 7.91593 16.0515 10.0003 18.3334C12.0847 16.0515 13.2693 13.0901 13.3337 10.0001Z"
            stroke={color}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_276_2323">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default GlobeIcon;
