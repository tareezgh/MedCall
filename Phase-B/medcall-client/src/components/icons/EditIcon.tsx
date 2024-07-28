interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  onClick?: () => void;
  customClassName?: string;
}

const EditIcon = ({
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
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${customClassName}`}
        onClick={onClick}
      >
        <path
          d="M14.6665 5.3335H5.33317C4.62593 5.3335 3.94765 5.61445 3.44755 6.11454C2.94746 6.61464 2.6665 7.29292 2.6665 8.00016V26.6668C2.6665 27.3741 2.94746 28.0524 3.44755 28.5524C3.94765 29.0525 4.62593 29.3335 5.33317 29.3335H23.9998C24.7071 29.3335 25.3854 29.0525 25.8855 28.5524C26.3856 28.0524 26.6665 27.3741 26.6665 26.6668V17.3335"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M26.6665 2.50488C25.9164 2.50488 25.1969 2.80288 24.6665 3.33331L11.9998 16L10.6665 21.3333L15.9998 20L28.6665 7.33331C29.1969 6.80288 29.4949 6.08346 29.4949 5.33331C29.4949 4.58316 29.1969 3.86374 28.6665 3.33331C28.1361 2.80288 27.4166 2.50488 26.6665 2.50488Z"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};

export default EditIcon;
