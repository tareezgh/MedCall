interface SignUpTabsProps {
  title: string;
  active: boolean;
  onClick: () => void;
  customClassName?: string;
}

const Tab = ({ title, active, onClick,customClassName }: SignUpTabsProps) => {
  const tabStyle = `${active ? "bg-primary500 text-textColor" : "text-secondary500 border border-secondary500"}`;
  return (
    <div className="flex justify-center gap-4  ">
      <button
        className={`${tabStyle} ${customClassName} text-lg font-semibold py-2 px-10 rounded-full`}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default Tab;
