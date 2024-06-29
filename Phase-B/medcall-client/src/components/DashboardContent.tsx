import { useSelector } from "react-redux";

interface DashboardContentProps {}

const DashboardContent = ({}: DashboardContentProps) => {
  const currentUser = useSelector((state: any) => state.currentUser);
  const getWidths = () => {
    switch (currentUser.role) {
      case "Admin":
        return { leftWidth: 30, rightWidth: 70 };
      case "User":
        return { leftWidth: 50, rightWidth: 50 };
      case "Driver":
        return { leftWidth: 70, rightWidth: 30 };
      default:
        return { leftWidth: 50, rightWidth: 50 };
    }
  };

  const { leftWidth, rightWidth } = getWidths();
  return (
    <div className="flex flex-col items-start w-full gap-4">
      <h1 className="text-4xl w-full text-start">
        Welcome {`${currentUser.firstName}`}
      </h1>
      <div className="flex flex-row gap-4 w-full h-full">
        <div
          className="left-side"
          style={{ width: `${leftWidth}%`, background: "#f0f0f0" }}
        >
          Left Side Content
        </div>
        <div
          className="right-side"
          style={{ width: `${rightWidth}%`, background: "#d0d0d0" }}
        >
          Right Side Content
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
