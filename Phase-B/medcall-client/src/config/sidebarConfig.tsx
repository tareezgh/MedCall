import { useTranslation } from "react-i18next";
import {
  ChatIcon,
  DashboardIcon,
  EditIcon,
  TrackIcon,
  UsersIcon,
} from "../components/icons";
import { TabsTypes } from "../interfaces/types";

type SidebarConfig = Record<
  string,
  { text: string; icon: React.ReactNode; activeTab: TabsTypes }[]
>;

const sidebarConfig = (): SidebarConfig => {
  const { t } = useTranslation();

  return {
    user: [
      {
        text: t("Dashboard"),
        icon: <DashboardIcon />,
        activeTab: "dashboard",
      },
      {
        text: t("Tracking"),
        icon: <TrackIcon />,
        activeTab: "tracking",
      },
      {
        text: t("Messages"),
        icon: <ChatIcon />,
        activeTab: "messages",
      },
    ],
    admin: [
      {
        text: t("Dashboard"),
        icon: <DashboardIcon />,
        activeTab: "dashboard",
      },
      {
        text: t("Requests"),
        icon: <UsersIcon />,
        activeTab: "driverRequest",
      },
      {
        text: t("Edit"),
        icon: <EditIcon />,
        activeTab: "adminEdit",
      },
    ],
    driver: [
      {
        text: t("Dashboard"),
        icon: <DashboardIcon />,
        activeTab: "dashboard",
      },
      {
        text: t("Active"),
        icon: <TrackIcon />,
        activeTab: "driverTracking",
      },
      {
        text: t("Messages"),
        icon: <ChatIcon />,
        activeTab: "messages",
      },
    ],
    guest: [
      {
        text: t("Dashboard"),
        icon: <DashboardIcon />,
        activeTab: "dashboard",
      },
    ],
  };
};

export default sidebarConfig;
