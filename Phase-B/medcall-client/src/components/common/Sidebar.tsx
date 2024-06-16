import Button from "../Button";
import logo from "../../assets/logo-img.webp";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useState } from "preact/hooks";
import DashboardIcon from "../icons/DashboardIcon";
import TrackIcon from "../icons/TrackIcon";

interface SidebarProps {
  items?: [];
  customClassName?: string;
}

const Sidebar = ({}: SidebarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderSidebarTab = (text: string, icon: React.ReactNode, onClick: () => void) => {
    const buttonStyle = `${
      activeTab == text.toLowerCase()
        ? "bg-lightBg"
        : "hover:opacity-70"
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
      <nav className="flex flex-col items-center justify-between h-screen w-1/5 p-6 border-l custom-border shadow">
        <div className="flex flex-col gap-6 ">
          <div
            className="logo-side hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt={"MedCall Logo"} className="h-[2.5rem]" />
          </div>
          <div className="buttons-side flex flex-col gap-3">
            {renderSidebarTab("Dashboard", <DashboardIcon/>, ()=>{})}
            {renderSidebarTab("Tracking", <TrackIcon/>, ()=>{})}
            {/* <Button
              text={t("navbar-login-button")}
              type="secondary"
              onClick={() => navigate("/")}
            /> */}
            {/* <Button
              text={t("navbar-sign-up-button")}
              type="primary"
              onClick={() => navigate("/")}
            />
            <Button
              text={t("navbar-sign-up-button")}
              type="primary"
              onClick={() => navigate("/")}
            /> */}
          </div>
        </div>
        <div className="buttons-side flex flex-col gap-3">
          <Button
            text={t("navbar-login-button")}
            type="secondary"
            onClick={() => navigate("/")}
          />
          <Button
            text={t("navbar-sign-up-button")}
            type="primary"
            onClick={() => navigate("/")}
          />
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
