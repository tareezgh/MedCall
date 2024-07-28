import { useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import NewRequestItem from "../components/NewRequestItem";

const DriverDashboardContent = () => {
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

  const renderNewRequests = () => {
    return (
      <>
        <div className="flex justify-start items-center text-center flex-col gap-6 p-6 bg-modalBackground rounded-2xl w-full h-fit shadow-xl">
          <h2 className="text-xl font-bold">
            {t("driver-new-requests-title")}
          </h2>

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

  const renderEmergencyDetails = () => {
    if (!selectedRequest) {
      return (
        <div className="flex justify-start text-center flex-col gap-8 p-6 bg-modalBackground rounded-2xl w-full h-fit shadow-xl">
          <h2 className="text-3xl font-bold">
            {t("driver-emergency-details-title")}
          </h2>
          <p>{t("driver-no-request-selected")}</p>
        </div>
      );
    }

    return (
      <>
        <div className="flex justify-start text-center flex-col gap-8 p-6 bg-modalBackground rounded-2xl w-full h-fit shadow-xl">
          <h2 className="text-3xl font-bold">
            {t("driver-emergency-details-title")}
          </h2>
          <div className="flex flex-col gap-4">
            <p>
              <strong>{t("driver-location")}:</strong>{" "}
              {selectedRequest.location}
            </p>
            <p>
              <strong>{t("driver-emergency-type")}:</strong>{" "}
              {selectedRequest.emergencyType}
            </p>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="left-side flex flex-col gap-4 w-[30%]">
        {renderNewRequests()}
      </div>

      <div className="right-side w-[70%]">{renderEmergencyDetails()}</div>
    </>
  );
};

export default DriverDashboardContent;
