import { useEffect, useState } from "preact/hooks";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import DashboardContent from "../components/DashboardContent.tsx";
import Tracking from "../components/Tracking.tsx";
import Messages from "../components/Messages.tsx";
import Profile from "../components/Profile.tsx";
import { TabsTypes } from "../interfaces/types.ts";

const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: any) => state.currentUser);
  const [activeTab, setActiveTab] = useState<TabsTypes>("dashboard");

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent setActiveTab={setActiveTab} />;
      case "tracking":
        return <Tracking />;
      case "messages":
        return <Messages />;
      case "profile":
        return <Profile />;
      case "driverTracking":
        return <Tracking />;
      case "driverRequest":
        return;
      case "adminEdit":
        return;
      default:
        return <DashboardContent setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        role={currentUser.role}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="flex flex-1">
        <main className="bg-dashboardBg flex-1 overflow-y-auto p-6 w-5/6 ml-[16.666667%]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
