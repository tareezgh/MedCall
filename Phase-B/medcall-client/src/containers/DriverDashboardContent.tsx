import { useEffect, useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import NewRequestItem from "../components/NewRequestItem";
import { getAllRequests } from "../services/requestService";
import { capitalizeFirstLetter, haversineDistance } from "../utils/helpers";
import Button from "../components/Button";
import MapComponent from "../components/Map";
import { AmbulanceRequest } from "../interfaces/types";

const DriverDashboardContent = () => {
  const { t } = useTranslation();
  const [selectedRequest, setSelectedRequest] =
    useState<AmbulanceRequest | null>(null);
  const [requests, setRequests] = useState<AmbulanceRequest[]>([]);
  const [nearestRequests, setNearestRequests] = useState<AmbulanceRequest[]>(
    []
  );

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const fetchedRequests = await getAllRequests();
        console.log("Fetched requests:", fetchedRequests);

        if (fetchedRequests) {
          setRequests(fetchedRequests);
        }
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      }
    };

    fetchAllRequests();
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    const calculateNearestRequests = async () => {
      if (requests.length === 0) return; // Ensure requests are available

      try {
        const driverCoords = await getDriverLocation();
        const driverLat = driverCoords.latitude;
        const driverLon = driverCoords.longitude;

        const distances = requests.map((request) => {
          const requestLat = request.location.lat;
          const requestLon = request.location.long;
          return {
            ...request,
            distance: haversineDistance(
              driverLat,
              driverLon,
              requestLat,
              requestLon
            ),
          };
        });

        distances.sort((a, b) => a.distance - b.distance);
        console.log("🚀 ~ calculateNearestRequests ~ distances:", distances);

        setNearestRequests(distances);
      } catch (error) {
        console.error("Failed to get driver location:", error);
      }
    };

    calculateNearestRequests();
  }, [requests]);

  const getDriverLocation = async () => {
    return new Promise<GeolocationCoordinates>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position.coords),
          (error) => reject(error)
        );
      } else {
        reject(new Error("Geolocation not supported"));
      }
    });
  };

  const details = [
    {
      label: t("driver-emergency-type"),
      value: capitalizeFirstLetter(selectedRequest?.emergencyType || ""),
      isBadge: true,
    },
    {
      label: t("patient-age-title"),
      value: selectedRequest?.patientAge ?? "-",
    },
    {
      label: t("consciousness-title"),
      value: capitalizeFirstLetter(selectedRequest?.consciousness || ""),
    },
    {
      label: t("breathing-status-title"),
      value: capitalizeFirstLetter(
        selectedRequest?.breathingStatus.replace(/_/g, " ") || ""
      ),
    },
    {
      label: t("bleeding-title"),
      value: capitalizeFirstLetter(
        selectedRequest?.bleeding.replace(/_/g, " ") || ""
      ),
    },
    {
      label: t("pain-level-title"),
      value: capitalizeFirstLetter(selectedRequest?.painLevel || ""),
    },
    {
      label: t("optional-info-allergies"),
      value: selectedRequest?.optionalAllergies || "-",
    },
    {
      label: t("optional-info-medications"),
      value: selectedRequest?.optionalMedications || "-",
    },
    {
      label: t("optional-info-activities"),
      value: selectedRequest?.optionalActivities || "-",
    },
  ];

  const markers = selectedRequest
    ? [
        {
          latitude: selectedRequest.location.lat,
          longitude: selectedRequest.location.long,
          popUp: capitalizeFirstLetter(selectedRequest.emergencyType),
        },
      ]
    : [];

  console.log("🚀 ~ markers ~ markers:", markers);

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
          {nearestRequests.map((request) => (
            <NewRequestItem
              key={request.requestId}
              location={request.location.address!}
              typeOfEmergency={capitalizeFirstLetter(request.emergencyType)}
              onClick={() => {
                setSelectedRequest(request);
              }}
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
              {details.map((item, index) => (
                <p key={index}>
                  <strong>{item.label}:</strong>{" "}
                  {item.isBadge ? (
                    <span className="text-base px-5 py-1 rounded-full ml-2 bg-secondary500 text-white">
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
              onClick={() => {}}
              customClassName="text-lg hover:bg-slate-500"
            />
            <Button
              text={t("accept-request")}
              type="primary"
              onClick={() => {}}
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
