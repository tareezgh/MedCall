import { route } from "preact-router";
import { useSelector } from "react-redux";
import logo from "../../assets/logo-img.webp";
import { handleLogout } from "../../utils/authHandles";
import { TabsTypes } from "../../interfaces/types";

import { LogoutIcon, MenuIcon, SettingsIcon, XIcon } from "../icons";
import sidebarConfig from "../../config/sidebarConfig";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  role: string;
  activeTab: string;
  setActiveTab: (tab: TabsTypes) => void;
  isSidebarOpen: boolean;
  toggleSidebar: (flag?: boolean) => void;
}

const Sidebar = ({
  role,
  activeTab,
  setActiveTab,
  isSidebarOpen,
  toggleSidebar,
}: SidebarProps) => {
  const { t } = useTranslation();
  const currentUser = useSelector((state: any) => state.currentUser);
  const isGuest = !currentUser.id;
  const config = sidebarConfig();

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
            toggleSidebar(false);
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
      <nav className="flex flex-col items-start justify-between h-screen relative bg-white md:top-[-5rem] w-2/3 md:w-64 p-6 border-l custom-border shadow">
        <div className="flex flex-col gap-6 ">
          <div className="md:hidden z-50" onClick={() => toggleSidebar()}>
            {isSidebarOpen ? <XIcon /> : <MenuIcon />}
          </div>
          <div
            className="logo-side hover:cursor-pointer"
            onClick={() => route("/")}
          >
            <img src={logo} alt={"MedCall Logo"} className="h-[2.5rem]" />
          </div>
          <div className="buttons-side flex flex-col gap-3 items-start">
            {config[isGuest ? "guest" : role]?.map(
              ({ text, icon, activeTab: tab }) =>
                renderSidebarTab(text, icon, tab)
            )}
          </div>
        </div>
        {!isGuest && (
          <div className="buttons-side flex flex-col gap-3 items-start">
            {renderSidebarTab(t("Settings"), <SettingsIcon />, "profile")}
            {renderSidebarTab(t("Log out"), <LogoutIcon />, "logout", () => {
              handleLogout();
              route("/");
            })}
          </div>
        )}
      </nav>
    </>
  );
};

export default Sidebar;
