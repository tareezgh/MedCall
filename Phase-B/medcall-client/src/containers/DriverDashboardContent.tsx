import { useEffect, useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import NewRequestItem from "../components/NewRequestItem";
import { getAllRequests } from "../services/requestService";
import { capitalizeFirstLetter } from "../utils/helpers";

const DriverDashboardContent = () => {
  const { t } = useTranslation();
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const requests = await getAllRequests();
        console.log("🚀 ~ fetchAllRequests ~ requests:", requests);
        if (requests) {
          setRequests(requests);
        }
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      }
    };

    fetchAllRequests();
  }, []);

  const renderNewRequests = () => {
    return (
      <>
        <div className="flex justify-start items-center text-center flex-col gap-6 p-6 bg-modalBackground rounded-2xl w-full h-fit shadow-xl">
          <h2 className="text-xl font-bold">
            {t("driver-new-requests-title")}
          </h2>

          <div className="flex flex-col gap-4 w-full">
            {requests.map((request) => (
              <NewRequestItem
                key={request.id}
                location={request.location.address}
                typeOfEmergency={capitalizeFirstLetter(request.emergencyType)}
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
              {selectedRequest.location.address}
            </p>
            <p>
              <strong>{t("driver-emergency-type")}:</strong>{" "}
              {capitalizeFirstLetter(selectedRequest.emergencyType)}
            </p>
            <p>
              <strong>{t("driver-emergency-type")}:</strong>{" "}
              {capitalizeFirstLetter(selectedRequest.bleeding)}
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
