interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  onClick?: () => void;
  customClassName?: string;
}

const NotificationIcon = ({
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
          d="M20.0475 16.4733C18.8437 15 17.9939 14.25 17.9939 10.1883C17.9939 6.46875 16.0945 5.14359 14.5312 4.5C14.3236 4.41469 14.1281 4.21875 14.0648 4.00547C13.7906 3.07219 13.0219 2.25 12 2.25C10.9781 2.25 10.2089 3.07266 9.93749 4.00641C9.87421 4.22203 9.67874 4.41469 9.47108 4.5C7.90593 5.14453 6.00842 6.465 6.00842 10.1883C6.00608 14.25 5.15624 15 3.95249 16.4733C3.45374 17.0836 3.89061 18 4.76296 18H19.2417C20.1094 18 20.5434 17.0808 20.0475 16.4733Z"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 18V18.75C15 19.5456 14.6839 20.3087 14.1213 20.8713C13.5587 21.4339 12.7956 21.75 12 21.75C11.2044 21.75 10.4413 21.4339 9.87868 20.8713C9.31607 20.3087 9 19.5456 9 18.75V18"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};

export default NotificationIcon;
