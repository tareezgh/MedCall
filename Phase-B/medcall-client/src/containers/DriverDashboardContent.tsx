import { useEffect, useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import NewRequestItem from "../components/NewRequestItem";
import { getAllRequests } from "../services/requestService";
import { capitalizeFirstLetter } from "../utils/helpers";
import Button from "../components/Button";
import MapComponent from "../components/Map";

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

  const markers = requests.map((request) => ({
    latitude: request.location.lat,
    longitude: request.location.long,
    popUp: capitalizeFirstLetter(request.emergencyType),
  }));
  console.log("🚀 ~ markers ~ markers:", markers)

  const renderMap = () => {
    return (
      <>
        <div className="flex flex-col justify-start items-start text-start gap-6 p-6 bg-modalBackground rounded-2xl w-full min-h-80 shadow-2xl">
          <h2 className="text-xl font-bold">{t("admin-map-title")}</h2>
          <MapComponent markers={markers} />
        </div>
      </>
    );
  };

  const renderNewRequests = () => {
    return (
      <div className="flex justify-start items-center text-center flex-col gap-6 p-6 bg-white rounded-2xl w-full h-fit shadow-xl">
        <h2 className="text-xl font-bold text-gray-800">
          {t("driver-new-requests-title")}
        </h2>
        <div className="flex flex-col gap-4 w-full">
          {requests.map((request) => (
            <NewRequestItem
              key={request.id}
              location={request.location.address}
              typeOfEmergency={capitalizeFirstLetter(request.emergencyType)}
              onClick={() => { setSelectedRequest(request) }}
            />
          ))}
        </div>
      </div>
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
        <div className="flex flex-col gap-8 p-6 bg-modalBackground rounded-2xl w-full h-fit shadow-xl">
          <h2 className="text-3xl font-bold">
            {t("driver-emergency-details-title")}
          </h2>
          <div className="flex flex-row justify-between gap-8">
            {/* Left Section */}
            <div className="flex flex-col items-start gap-4 w-1/2">
              description here
              {[
                { label: t("driver-emergency-type"), value: capitalizeFirstLetter(selectedRequest.emergencyType), isBadge: true },
                { label: t("patient-age-title"), value: selectedRequest.patientAge },
                { label: t("consciousness-title"), value: capitalizeFirstLetter(selectedRequest.consciousness) },
                { label: t("breathing-status-title"), value: capitalizeFirstLetter(selectedRequest.breathingStatus.replace(/_/g, ' ')) },
                { label: t("bleeding-title"), value: capitalizeFirstLetter(selectedRequest.bleeding.replace(/_/g, ' ')) },
                { label: t("pain-level-title"), value: capitalizeFirstLetter(selectedRequest.painLevel) },
                { label: t("optional-info-allergies"), value: selectedRequest.optionalAllergies ? selectedRequest.optionalAllergies : '-' },
                { label: t("optional-info-medications"), value: selectedRequest.optionalMedications ? selectedRequest.optionalMedications : '-' },
                { label: t("optional-info-activities"), value: selectedRequest.optionalActivities ? selectedRequest.optionalActivities : '-' },
              ].map((item, index) => (
                <p key={index}>
                  <strong>{item.label}:</strong>{" "}
                  {item.isBadge ? (
                    <span className="text-sm px-5 py-1 rounded-full ml-2 bg-blue-950 text-white">
                      {item.value}
                    </span>
                  ) : (
                    item.value
                  )}
                </p>
              ))}
            </div>
            {/* Right Section */}
            {renderMap()}
          </div>
          <div className="flex flex-row justify-center gap-4 mt-8">
            <Button
              text={t("decline-request")}
              type="secondary"
              onClick={() => { }}
              customClassName="text-lg hover:bg-slate-500"
            />
            <Button
              text={t("accept-request")}
              type="primary"
              onClick={() => { }}
              customClassName="text-lg"
            />
          </div>
        </div>
      </>
    );


  };

  return (
    <>
      {/* left side */}
      <div className="left-side flex flex-col gap-4 w-[30%]">
        {renderNewRequests()}
      </div>
      {/* right side */}
      <div className="right-side w-[70%]">{renderEmergencyDetails()}</div>
    </>
  );
};

export default DriverDashboardContent;
