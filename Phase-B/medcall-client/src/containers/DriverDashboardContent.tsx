import { useEffect, useMemo, useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import NewRequestItem from "../components/NewRequestItem";
import {
  getActiveRequest,
  getAllRequests,
  updateRequestStatus,
} from "../services/requestService";
import { capitalizeFirstLetter, haversineDistance } from "../utils/helpers";
import Button from "../components/Button";
import MapComponent from "../components/Map";
import { AmbulanceRequest, TabsTypes } from "../interfaces/types";
import { useDispatch, useSelector } from "react-redux";
import { createConversation } from "../services/conversationService";
import { saveActiveRequest } from "../redux/Slicers";

interface DriverDashboardContentProps {
  setActiveTab: (tab: TabsTypes) => void;
  userAddress: string;
}

const DriverDashboardContent = ({
  setActiveTab,
  userAddress,
}: DriverDashboardContentProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentUser = useSelector((state: any) => state.currentUser);
  const [selectedRequest, setSelectedRequest] =
    useState<AmbulanceRequest | null>(null);
  const [requests, setRequests] = useState<AmbulanceRequest[]>([]);
  const [activeRequest, setActiveRequest] = useState<AmbulanceRequest | null>(
    null
  );

  const [driverLocation, setDriverLocation] =
    useState<GeolocationCoordinates | null>(null);
  const [declinedRequests, setDeclinedRequests] = useState<string[]>([]);

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
  }, []);

  useEffect(() => {
    const fetchActiveRequest = async () => {
      try {
        const fetchedRequest = await getActiveRequest(currentUser.id);
        console.log("Fetched active request:", fetchedRequest);
        if (fetchedRequest) {
          dispatch(saveActiveRequest(fetchedRequest));
          setActiveRequest(fetchedRequest);
        }
      } catch (error) {
        console.error("Failed to fetch active request:", error);
      }
    };

    fetchActiveRequest();
  }, [currentUser.id]);

  useEffect(() => {
    const getDriverLocation = async () => {
      const position = await new Promise<GeolocationCoordinates>(
        (resolve, reject) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => resolve(position.coords),
              (error) => reject(error)
            );
          } else {
            reject(new Error("Geolocation not supported"));
          }
        }
      );

      setDriverLocation(position);
    };

    getDriverLocation();
  }, []);

  const nearestRequests = useMemo(() => {
    if (!driverLocation || requests.length === 0) return [];

    const { latitude: driverLat, longitude: driverLon } = driverLocation;

    return requests
      .filter(
        (request) =>
          !declinedRequests.includes(request._id) &&
          request._id !== activeRequest?._id
      )
      .map((request) => {
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
      })
      .sort((a, b) => a.distance - b.distance);
  }, [driverLocation, requests, declinedRequests, activeRequest]);
  console.log("🚀 ~ nearestRequests ~ nearestRequests:", nearestRequests);

  const handleDeclineRequest = () => {
    if (selectedRequest) {
      setDeclinedRequests((prev) => [...prev, selectedRequest._id]);
      setSelectedRequest(null);
    }
  };

  const handleAcceptRequest = async () => {
    if (!selectedRequest) return;
    await updateRequestStatus(
      selectedRequest._id,
      "active",
      currentUser.id,
      `${currentUser.id}_${currentUser.firstName}`,
      {
        address: userAddress,
        lat: driverLocation?.latitude || 0,
        long: driverLocation?.longitude || 0,
      }
    );
    let conversation = await createConversation(
      currentUser.id,
      selectedRequest.userId!
    );
    console.log("🚀 ~ handleChatClick ~ conversation:", conversation);
    setActiveTab("driverTracking");
  };

  useEffect(() => {
    if (nearestRequests.length > 0) {
      setSelectedRequest(nearestRequests[0]);
    }
  }, [nearestRequests]);

  const details = useMemo(
    () => [
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
    ],
    [selectedRequest, t]
  );

  const markers = useMemo(
    () =>
      selectedRequest
        ? [
            {
              latitude: selectedRequest.location.lat,
              longitude: selectedRequest.location.long,
              popUp: capitalizeFirstLetter(selectedRequest.emergencyType),
              type: "user" as const,
            },
          ]
        : [],
    [selectedRequest]
  );

  const renderMap = () => {
    return (
      <>
        <div className="flex flex-col justify-start items-start text-start gap-6 p-6 bg-modalBackground rounded-2xl w-full h-[30rem] md:min-h-80 shadow-2xl">
          <h2 className="text-xl font-bold">{t("admin-map-title")}</h2>
          <MapComponent
            key={selectedRequest?._id || "default"}
            markers={markers}
            latitude={selectedRequest?.location.lat || 0}
            longitude={selectedRequest?.location.long || 0}
          />
        </div>
      </>
    );
  };

  const renderNewRequests = () => {
    return (
      <div className="flex flex-col justify-start items-center text-center gap-6 p-6 bg-white rounded-2xl w-full h-fit shadow-xl">
        <h2 className="text-xl font-bold text-gray-800">
          {t("driver-new-requests-title")}
        </h2>
        {nearestRequests.length > 0 ? (
          <div className="flex flex-col gap-4 w-full">
            {nearestRequests.map((request) => (
              <NewRequestItem
                key={request._id}
                location={request.location.address!}
                typeOfEmergency={capitalizeFirstLetter(request.emergencyType)}
                distance={`${request.distance.toFixed(2)} km`}
                onClick={() => {
                  setSelectedRequest(request);
                }}
              />
            ))}
          </div>
        ) : (
          <div
            className={
              "flex items-center justify-center w-full text-xl text-black"
            }
          >
            {t("empty-requests")}
          </div>
        )}
      </div>
    );
  };

  const renderEmergencyDetails = () => {
    if (!selectedRequest) {
      return (
        <div className="flex justify-start text-center flex-col gap-4 md:gap-8 p-6 bg-modalBackground rounded-2xl w-full h-fit shadow-xl">
          <h2 className="text-3xl font-bold">
            {t("driver-emergency-details-title")}
          </h2>
          <p>{t("driver-no-request-selected")}</p>
        </div>
      );
    }

    return (
      <>
        <div className="flex flex-col gap-4 md:gap-8 p-6 bg-modalBackground rounded-2xl w-full h-fit shadow-xl">
          <h2 className="text-3xl font-bold">
            {t("driver-emergency-details-title")}
          </h2>
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-8">
            {/* Left Section */}
            <div className="flex flex-col items-start justify-start gap-4 w-full md:w-1/2">
              {details.map((item, index) => (
                <p key={index} className="text-start">
                  <strong>{item.label} : </strong>
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
          <div className="flex flex-col-reverse md:flex-row justify-center gap-4 mt-8">
            <Button
              text={t("decline-request")}
              type="secondary"
              onClick={handleDeclineRequest}
              customClassName="text-lg hover:bg-slate-500"
              disabled={!!activeRequest}
            />
            <Button
              text={t("accept-request")}
              type="primary"
              onClick={handleAcceptRequest}
              customClassName="text-lg"
              disabled={!!activeRequest}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/* left side */}
      <div className="left-side flex flex-col gap-4 w-full md:w-[40%]">
        {renderNewRequests()}
      </div>
      {/* right side */}
      <div className="right-side w-full md:w-[60%]">
        {renderEmergencyDetails()}
      </div>
    </>
  );
};

export default DriverDashboardContent;
