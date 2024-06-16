interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  onClick?: () => void;
  customClassName?: string;
}

const TrackIcon = ({
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
          d="M7.29338 12.0001C9.8707 12.0001 11.96 9.91074 11.96 7.33341C11.96 4.75609 9.8707 2.66675 7.29338 2.66675C4.71605 2.66675 2.62671 4.75609 2.62671 7.33341C2.62671 9.91074 4.71605 12.0001 7.29338 12.0001Z"
          stroke={color}
          stroke-width="1.5"
        />
        <path
          d="M22.6266 20H26.6266C28.0933 20 29.2933 21.2 29.2933 22.6667V26.6667C29.2933 28.1333 28.0933 29.3333 26.6266 29.3333H22.6266C21.16 29.3333 19.96 28.1333 19.96 26.6667V22.6667C19.96 21.2 21.16 20 22.6266 20Z"
          stroke={color}
          stroke-width="1.5"
        />
        <path
          d="M16 6.66675H19.5733C22.04 6.66675 23.1867 9.72008 21.3333 11.3467L10.68 20.6667C8.82667 22.2801 9.97334 25.3334 12.4267 25.3334H16"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.31496 7.33341H7.33036"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M24.6482 24.6667H24.6636"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};

export default TrackIcon;
