import {
  ChatIcon,
  DashboardIcon,
  EditIcon,
  TrackIcon,
  UsersIcon,
} from "../components/icons";
import { TabsTypes } from "../interfaces/types";

const sidebarConfig: Record<
  string,
  { text: string; icon: React.ReactNode; activeTab: TabsTypes }[]
> = {
  user: [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      activeTab: "dashboard",
    },
    {
      text: "Tracking",
      icon: <TrackIcon />,
      activeTab: "tracking",
    },
    {
      text: "Messages",
      icon: <ChatIcon />,
      activeTab: "messages",
    },
  ],
  admin: [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      activeTab: "dashboard",
    },
    {
      text: "Requests",
      icon: <UsersIcon />,
      activeTab: "driverRequest",
    },
    {
      text: "Edit",
      icon: <EditIcon />,
      activeTab: "adminEdit",
    },
  ],
  driver: [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      activeTab: "dashboard",
    },
    {
      text: "Active",
      icon: <TrackIcon />,
      activeTab: "driverTracking",
    },
    {
      text: "Messages",
      icon: <ChatIcon />,
      activeTab: "messages",
    },
  ],
  guest: [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      activeTab: "dashboard",
    },
  ],
};

export default sidebarConfig;
