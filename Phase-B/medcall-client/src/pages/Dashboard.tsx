import { useEffect, useState } from "preact/hooks";
import { useSelector } from "react-redux";
import Sidebar from "../components/common/Sidebar";
import DashboardContent from "../components/DashboardContent.tsx";
import Tracking from "../components/Tracking.tsx";

import Profile from "../components/Profile.tsx";
import AdminEdit from "../components/AdminEdit.tsx";
import DriverRequest from "../components/DriverRequest.tsx";
import { TabsTypes } from "../interfaces/types.ts";
import { handleGetLocation } from "../utils/geolocationUtils.ts";
import LiveChat from "../components/LiveChat.tsx";
import Navbar from "../components/common/Navbar.tsx";

const Dashboard = () => {
  const currentUser = useSelector((state: any) => state.currentUser);
  const [activeTab, setActiveTab] = useState<TabsTypes>("dashboard");
  const [userPosition, setUserPosition] =
    useState<GeolocationCoordinates | null>(null);
  const [userAddress, setUserAddress] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = (flag?: boolean) => {
    setIsSidebarOpen(flag || !isSidebarOpen);
  };

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
        return <LiveChat />;
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
        return <DriverRequest />;
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
    <div className="flex flex-col">
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-row w-full relative">
        {/* Sidebar */}
        <div
          className={`fixed z-30 inset-0 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:transform-none`}
        >
          <Sidebar
            role={currentUser.role}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 bg-dashboardBg overflow-y-auto p-6">
          {renderContent()}
        </main>

        {/* Overlay for mobile */}
        {isSidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-20 "
            onClick={() => toggleSidebar()}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
