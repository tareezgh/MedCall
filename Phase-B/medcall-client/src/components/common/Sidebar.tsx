import { route } from "preact-router";
import logo from "../../assets/logo-img.webp";
import { handleLogout } from "../../utils/authHandles";
import { TabsTypes } from "../../interfaces/types";

import { LogoutIcon, SettingsIcon } from "../icons";
import sidebarConfig from "../../config/sidebarConfig";

interface SidebarProps {
  role: string;
  activeTab: string;
  setActiveTab: (tab: TabsTypes) => void;
  items?: [];
  customClassName?: string;
}

const Sidebar = ({ role, activeTab, setActiveTab }: SidebarProps) => {
  const renderSidebarTab = (
    text: string,
    icon: React.ReactNode,
    tab: TabsTypes,
    onClick?: () => void
  ) => {
    const lowercasedFirstLetter = tab.charAt(0).toLowerCase();
    const restOfText = tab.slice(1);
    const formattedTab = lowercasedFirstLetter + restOfText;

    const buttonStyle = `${
      activeTab == formattedTab ? "bg-lightBg" : "hover:opacity-70"
    }`;

    return (
      <button
        className={`${buttonStyle} flex items-center justify-center gap-2 text-xl px-6 py-3 rounded-3xl`}
        onClick={() => {
          if (onClick) {
            onClick();
          } else {
            setActiveTab(tab);
          }
        }}
      >
        {icon}
        {text}
      </button>
    );
  };
  return (
    <>
      <nav className="flex flex-col items-start justify-between h-screen relative bg-white top-[-5rem] w-64 p-6 border-l custom-border shadow">
        <div className="flex flex-col gap-6 ">
          <div
            className="logo-side hover:cursor-pointer"
            onClick={() => route("/")}
          >
            <img src={logo} alt={"MedCall Logo"} className="h-[2.5rem]" />
          </div>
          <div className="buttons-side flex flex-col gap-3 items-start">
            {sidebarConfig[role]?.map(({ text, icon, activeTab: tab }) =>
              renderSidebarTab(text, icon, tab)
            )}
          </div>
        </div>
        <div className="buttons-side flex flex-col gap-3 items-start">
          {renderSidebarTab("Settings", <SettingsIcon />, "profile")}
          {renderSidebarTab("Log out", <LogoutIcon />, "logout", () => {
            handleLogout();
            route("/");
          })}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
