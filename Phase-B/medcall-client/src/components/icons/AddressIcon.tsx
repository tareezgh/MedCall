interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  onClick?: () => void;
  customClassName?: string;
}

const AddressIcon = ({
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
        <g clip-path="url(#clip0_40_11365)">
          <path
            d="M16 31.1666C16 31.1666 28 23.1666 28 13.8333C28 10.6507 26.7357 7.59841 24.4853 5.34797C22.2348 3.09753 19.1826 1.83325 16 1.83325C12.8174 1.83325 9.76515 3.09753 7.51472 5.34797C5.26428 7.59841 4 10.6507 4 13.8333C4 23.1666 16 31.1666 16 31.1666Z"
            stroke={color}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 17.8333C18.2091 17.8333 20 16.0424 20 13.8333C20 11.6241 18.2091 9.83325 16 9.83325C13.7909 9.83325 12 11.6241 12 13.8333C12 16.0424 13.7909 17.8333 16 17.8333Z"
            stroke={color}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_40_11365">
            <rect
              width={width}
              height={height}
              fill="white"
              transform="translate(0 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default AddressIcon;
