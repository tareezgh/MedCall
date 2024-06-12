interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  onClick?: () => void;
  customClassName?: string;
}

const LocationIcon = ({
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
        <g clip-path="url(#clip0_128_530)">
          <path
            d="M17.3644 0.136956L1.12301 7.63305C-0.750816 8.50766 -0.126206 11.2561 1.87262 11.2561H8.74411V18.1276C8.74411 20.1264 11.4925 20.7514 12.3672 18.8772L19.8632 2.63578C20.4879 1.13617 18.8636 -0.488044 17.3644 0.136956Z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="clip0_128_530">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default LocationIcon;
