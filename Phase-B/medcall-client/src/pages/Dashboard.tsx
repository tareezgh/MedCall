import { useEffect, useState } from "preact/hooks";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import DashboardContent from "../components/DashboardContent.tsx";
import Tracking from "../components/Tracking.tsx";
// import Messages from "../components/Messages.tsx";
import Chat from "../components/Chat.tsx";
import Profile from "../components/Profile.tsx";
import AdminEdit from "../components/AdminEdit.tsx";
import DriverRequest from "../components/DriverRequest.tsx";
import { TabsTypes } from "../interfaces/types.ts";
// import UserMessages from "../components/UserMessages.tsx";
import { handleGetLocation } from "../utils/geolocationUtils.ts";

const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: any) => state.currentUser);
  const [activeTab, setActiveTab] = useState<TabsTypes>("dashboard");
  const [userPosition, setUserPosition] =
    useState<GeolocationCoordinates | null>(null);
  const [userAddress, setUserAddress] = useState("");
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  useEffect(() => {
    const getUserPosition = async () => {
      const position = await new Promise<GeolocationCoordinates>(
        (resolve, reject) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => resolve(position.coords),
              (error) => reject(error)
            );
          } else {
            reject(new Error("Geolocation not supported"));
          }
        }
      );

      setUserPosition(position);
    };
    const getUserLocation = async () => {
      const address = await handleGetLocation(true);
      if (address) {
        setUserAddress(address);
      }
    };
    getUserPosition();
    getUserLocation();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardContent
            userAddress={userAddress}
            userPosition={userPosition}
            setActiveTab={setActiveTab}
          />
        );
      case "tracking":
        return (
          <Tracking
            userAddress={userAddress}
            userPosition={userPosition}
            setActiveTab={setActiveTab}
          />
        );
      case "messages":
        return <Chat />;
      case "profile":
        return <Profile />;
      case "driverTracking":
        return (
          <Tracking
            userAddress={userAddress}
            userPosition={userPosition}
            setActiveTab={setActiveTab}
          />
        );
      case "driverRequest":
        return <DriverRequest/>
      case "adminEdit":
        return <AdminEdit />;
      default:
        return (
          <DashboardContent
            userAddress={userAddress}
            userPosition={userPosition}
            setActiveTab={setActiveTab}
          />
        );
    }
  };

  return (
    <div className="flex flex-row h-screen w-full">
      <Sidebar
        role={currentUser.role}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className="flex-1 bg-dashboardBg overflow-y-auto p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
