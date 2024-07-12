import { useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import NewRequestItem from "../components/NewRequestItem";

const AdminDashboardContent = () => {
  const { t } = useTranslation();
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const mockRequests = [
    {
      id: 1,
      location: "123 Main St",
      emergencyType: "Cardiac Arrest",
    },
    {
      id: 2,
      location: "456 Elm St",
      emergencyType: "Severe Bleeding",
    },
    {
      id: 3,
      location: "789 Pine St",
      emergencyType: "Road Accident",
    },
  ];

  const renderMap = () => {
    return (
      <>
        <div className="flex flex-col justify-start items-start text-start gap-6 p-6 bg-modalBackground rounded-2xl w-full h-fit shadow-xl">
          <h2 className="text-xl font-bold">{t("admin-map-title")}</h2>
        </div>
      </>
    );
  };

  const renderNewRequests = () => {
    return (
      <>
        <div className="flex flex-col justify-start items-start text-start gap-6 p-6 bg-modalBackground rounded-2xl w-full h-fit shadow-xl">
          <h2 className="text-xl font-bold">{t("admin-new-requests-title")}</h2>

          <div className="flex flex-col gap-4 w-full">
            {mockRequests.map((request) => (
              <NewRequestItem
                key={request.id}
                location={request.location}
                typeOfEmergency={request.emergencyType}
                onClick={() => setSelectedRequest(request)}
              />
            ))}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <>
        <div className="left-side w-1/2">{renderMap()}</div>
        <div className="right-side w-1/2">{renderNewRequests()}</div>
      </>
    </>
  );
};

export default AdminDashboardContent;
