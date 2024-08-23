import { useEffect, useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import NewRequestItem from "../components/NewRequestItem";
import { getAllRequests } from "../services/requestService";
import { capitalizeFirstLetter } from "../utils/helpers";
import MapComponent from "../components/Map";
import { AmbulanceRequest } from "../interfaces/types";

const AdminDashboardContent = () => {
  const { t } = useTranslation();
  const [selectedRequest, setSelectedRequest] =
    useState<AmbulanceRequest | null>(null);
  const [hoveredRequestId, setHoveredRequestId] = useState<string | null>(null);
  const [requests, setRequests] = useState<AmbulanceRequest[]>([]);

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

  const hoveredRequest = requests.find(
    (request) => request._id === hoveredRequestId
  );
  const centerLatitude =
    hoveredRequest?.location.lat ||
    selectedRequest?.location.lat ||
    32.06823723362243;
  const centerLongitude =
    hoveredRequest?.location.long ||
    selectedRequest?.location.long ||
    34.783579881141655;

  const markers = requests.map((request) => ({
    id: request._id,
    latitude: request.location.lat,
    longitude: request.location.long,
    popUp: capitalizeFirstLetter(request.emergencyType),
    type: "user" as const,
  }));

  const handleMouseEnter = (id: string) => {
    setHoveredRequestId(id);
  };

  const handleMouseLeave = () => {
    setHoveredRequestId(null);
  };

  const renderMap = () => {
    return (
      <>
        <div className="flex flex-col justify-start items-start text-start gap-6 p-6 bg-modalBackground rounded-2xl w-full h-screen shadow-xl">
          <h2 className="text-xl font-bold">{t("admin-map-title")}</h2>
          <MapComponent
            key={hoveredRequest?._id || "default"}
            markers={markers}
            latitude={centerLatitude}
            longitude={centerLongitude}
          />
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
            {requests.map((request) => (
              <div
                key={request._id}
                onMouseEnter={() => handleMouseEnter(request._id)}
                onMouseLeave={handleMouseLeave}
              >
                <NewRequestItem
                  key={request._id}
                  location={request.location.address || ""}
                  typeOfEmergency={capitalizeFirstLetter(request.emergencyType)}
                  onClick={() => setSelectedRequest(request)}
                  status={request.status}
                />
              </div>
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
