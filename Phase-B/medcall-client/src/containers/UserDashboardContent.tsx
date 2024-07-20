import { useEffect, useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import HistoryItem from "../components/HistoryItem";
import { PlusIcon } from "../components/icons";
import { fetchActiveRequest } from "../services/requestService";
import { TabsTypes } from "../interfaces/types";

interface UserDashboardContentProps {
  setActiveTab: (tab: TabsTypes) => void;
}

const UserDashboardContent = ({ setActiveTab }: UserDashboardContentProps) => {
  const { t } = useTranslation();
  const [activeRequest, setActiveRequest] = useState<any>(null); //TODO need to change type when back is ready
  const [status, setStatus] = useState("starting"); // "starting", "active", "completed", "none"

  const historyMockData = [
    {
      date: "2024-07-01",
      typeOfEmergency: "Cardiac Arrest",
      location: "123 Main St",
    },
    {
      date: "2024-06-28",
      typeOfEmergency: "Severe Bleeding",
      location: "456 Elm St",
    },
    {
      date: "2024-06-25",
      typeOfEmergency: "Road Accident",
      location: "789 Pine St",
    },
  ];

  useEffect(() => {
    const getActiveRequest = async () => {
      try {
        const response = await fetchActiveRequest();
        setStatus(response.status);
        if (response.status === "active") {
          setActiveRequest(response.request);
        }
      } catch (error) {
        console.error("Failed to fetch active request:", error);
        setStatus("error");
      }
    };
    getActiveRequest();
  }, []);

  const renderActiveRequest = () => {
    return (
      <>
        <div className="flex flex-col justify-start items-center text-center gap-6 p-6 bg-modalBackground rounded-2xl w-full h-fit shadow-xl">
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="text-3xl font-bold">{t("active-request.title")}</h2>
            <h5 className="text-xl">{t("active-request.subtitle")}</h5>
          </div>
          <Button
            text={t("active-request.track-now-button")}
            type="primary"
            onClick={() => setActiveTab("tracking")}
            customClassName="text-2xl custom-green-button"
          />
        </div>
      </>
    );
  };

  const renderNewRequest = () => {
    return (
      <>
        <div className="flex flex-col justify-center items-center text-center  gap-6 p-6 bg-modalBackground rounded-2xl w-full h-fit shadow-xl">
          <div className="flex justify-center items-center h-12 w-12 rounded-full border-2 border-secondary500 opacity-50">
            <PlusIcon width={37} height={36} />
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="text-3xl font-bold">{t("new-request.title")}</h2>
            <h5 className="text-xl w-[65%]">{t("new-request.subtitle")}</h5>
          </div>
          <Button
            text={t("new-request.order-now-button")}
            type="primary"
            onClick={() => {}}
            customClassName="text-2xl"
          />
        </div>
      </>
    );
  };

  const renderHistory = () => {
    return (
      <>
        <div className="flex flex-col justify-start text-start gap-8 p-6 bg-modalBackground rounded-2xl w-full h-fit shadow-xl">
          <h2 className="text-3xl font-bold">{t("history.title")}</h2>
          <div className="flex flex-col gap-4">
            {historyMockData.map((item, index) => (
              <HistoryItem
                key={index}
                date={item.date}
                typeOfEmergency={item.typeOfEmergency}
                location={item.location}
              />
            ))}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="left-side flex flex-col gap-4 w-1/2">
        {status !== "completed" && renderActiveRequest()}
        {renderNewRequest()}
      </div>
      <div className="right-side w-1/2">{renderHistory()}</div>
    </>
  );
};

export default UserDashboardContent;
