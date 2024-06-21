interface TabProps {
  title: string;
  type:  "primary" | "secondary";
  active: boolean;
  onClick: () => void;
  customClassName?: string;
}

const Tab = ({ title, type, active, onClick, customClassName }: TabProps) => {
  const getTabStyle = () => {
    if (active) {
      switch (type) {
        case "primary":
          return "bg-primary500 text-textColor";
        case "secondary":
          return "bg-secondary500 text-textColor";
        default:
          return "bg-primary500 text-textColor";
      }
    } else {
      return "text-secondary500 border border-secondary500";
    }
  };

  return (
    <div className="flex justify-center gap-4  ">
      <button
        className={`${getTabStyle()} ${customClassName} text-lg font-semibold py-2 px-10 rounded-full`}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default Tab;
