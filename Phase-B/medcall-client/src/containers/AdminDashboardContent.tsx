import { useEffect, useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import NewRequestItem from "../components/NewRequestItem";
import { getAllRequests } from "../services/requestService";
import { capitalizeFirstLetter } from "../utils/helpers";
import MapComponent from "../components/Map";

const AdminDashboardContent = () => {
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

  useEffect(() => {
    console.log("🚀  ~ selectedRequest:", selectedRequest);
  }, [selectedRequest]);

  const markers = requests.map((request) => ({
    latitude: request.location.lat,
    longitude: request.location.long,
    popUp: capitalizeFirstLetter(request.emergencyType),
  }));
  console.log("🚀 ~ markers ~ markers:", markers)

  const renderMap = () => {
    return (
      <>
        <div className="flex flex-col justify-start items-start text-start gap-6 p-6 bg-modalBackground rounded-2xl w-full h-screen shadow-xl">
          <h2 className="text-xl font-bold">{t("admin-map-title")}</h2>
          <MapComponent markers={markers}/>
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
