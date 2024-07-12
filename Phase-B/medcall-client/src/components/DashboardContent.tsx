import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import UserDashboardContent from "../containers/UserDashboardContent";
import AdminDashboardContent from "../containers/AdminDashboardContent";
import DriverDashboardContent from "../containers/DriverDashboardContent";

interface DashboardContentProps {}

const DashboardContent = ({}: DashboardContentProps) => {
  const { t } = useTranslation();
  const currentUser = useSelector((state: any) => state.currentUser);

  const renderContent = () => {
    switch (currentUser.role) {
      case "admin":
        return <AdminDashboardContent />;
      case "user":
        return <UserDashboardContent />;
      case "driver":
        return <DriverDashboardContent />;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex flex-col items-start w-full gap-4">
        <h1 className="text-4xl w-full text-start">
          {t("welcome")} {`${currentUser.firstName}`}
        </h1>
        <div className="flex flex-row gap-4 w-full h-full">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
