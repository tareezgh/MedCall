import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import UserDashboardContent from "../containers/UserDashboardContent";
import AdminDashboardContent from "../containers/AdminDashboardContent";
import DriverDashboardContent from "../containers/DriverDashboardContent";
import { TabsTypes } from "../interfaces/types";

interface DashboardContentProps {
  userAddress: string;
  userPosition: GeolocationCoordinates | null;
  setActiveTab: (tab: TabsTypes) => void;
}

const DashboardContent = ({
  userAddress,
  setActiveTab,
}: DashboardContentProps) => {
  const { t } = useTranslation();
  const currentUser = useSelector((state: any) => state.currentUser);

  const renderContent = () => {
    switch (currentUser.role) {
      case "admin":
        return <AdminDashboardContent />;
      case "user":
        return <UserDashboardContent setActiveTab={setActiveTab} />;
      case "driver":
        return (
          <DriverDashboardContent
            setActiveTab={setActiveTab}
            userAddress={userAddress}
          />
        );
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex flex-col items-start w-full gap-4">
        <div className="flex flex-row items-start justify-between text-center w-full ">
          <h1 className="text-4xl w-full text-start">
            {t("welcome")} {`${currentUser.firstName}`}
          </h1>
          {currentUser.role === "driver" && (
            <div className={"w-fit whitespace-nowrap"}>{userAddress}</div>
          )}
        </div>
        <div className="flex flex-row gap-4 w-full h-full">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
