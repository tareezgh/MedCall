import googleIcon from "../assets/icons/google.svg";
interface GoogleButtonProps {
  text: string;
  onClick: () => void;
}

const GoogleButton = ({ text, onClick }: GoogleButtonProps) => {
  return (
    <>
      <button
        className={`flex items-center justify-center bg-white text-backText px-6 py-3 rounded-3xl shadow`}
        onClick={onClick}
      >
          <img
        src={googleIcon}
        alt="Google Icon"
        className="w-6 h-6 mr-2"
      />
        {text}
      </button>
    </>
  );
};

export default GoogleButton;
