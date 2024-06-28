import Button from "../Button";
import logo from "../../assets/logo-img.webp";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useState } from "preact/hooks";
import {
  ChatIcon,
  DashboardIcon,
  LogoutIcon,
  SettingsIcon,
  TrackIcon,
} from "../icons";
import { handleLogout } from "../../utils/authHandles";

interface SidebarProps {
  role: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  items?: [];
  customClassName?: string;
}

const Sidebar = ({
  role,
  activeTab,
  setActiveTab,
  customClassName,
}: SidebarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const renderSidebarTab = (
    text: string,
    icon: React.ReactNode,
    onClick: () => void
  ) => {
    const buttonStyle = `${
      activeTab == text.toLowerCase() ? "bg-lightBg" : "hover:opacity-70"
    }`;

    return (
      <button
        className={`${buttonStyle} flex items-center justify-center gap-2 text-xl px-6 py-3 rounded-3xl`}
        onClick={onClick}
      >
        {icon}
        {text}
      </button>
    );
  };
  return (
    <>
      <nav className="flex flex-col items-start justify-between h-screen fixed bg-white top-0 w-1/6 p-6 border-l custom-border shadow">
        <div className="flex flex-col gap-6 ">
          <div
            className="logo-side hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt={"MedCall Logo"} className="h-[2.5rem]" />
          </div>
          <div className="buttons-side flex flex-col gap-3 items-start">
            {renderSidebarTab("Dashboard", <DashboardIcon />, () => setActiveTab("dashboard"))}
            {renderSidebarTab("Tracking", <TrackIcon />, () => setActiveTab("tracking"))}
            {renderSidebarTab("Messages", <ChatIcon />, () => setActiveTab("messages"))}
          </div>
        </div>
        <div className="buttons-side flex flex-col gap-3 items-start">
          {renderSidebarTab("Settings", <SettingsIcon />, () => setActiveTab("settings"))}
          {renderSidebarTab("Log out", <LogoutIcon />, () => {
            handleLogout();
            navigate("/");
          })}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
