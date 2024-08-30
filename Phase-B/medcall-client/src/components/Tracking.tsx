import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Button from "./Button";
import {
  getActiveRequest,
  updateRequestStatus,
} from "../services/requestService";
import { useEffect, useMemo, useState } from "preact/hooks";
import { AmbulanceRequest, TabsTypes } from "../interfaces/types";
import LocationItem from "./LocationItem";
import { ChatIcon } from "./icons";
import MapComponent from "./Map";
import { capitalizeFirstLetter } from "../utils/helpers";
import { useNavigate } from "react-router-dom";


interface TrackingProps {
  setActiveTab: (tab: TabsTypes) => void;
  userAddress: string;
  userPosition: GeolocationCoordinates | null;
}

const Tracking = ({ setActiveTab }: TrackingProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentUser = useSelector((state: any) => state.currentUser);
  const [activeRequest, setActiveRequest] = useState<AmbulanceRequest | null>(
    null
  );

  const currentRole = currentUser.role;

  useEffect(() => {
    const fetchActiveRequest = async () => {
      try {
        const fetchedRequest = await getActiveRequest(currentUser.id);
        console.log("Fetched request:", fetchedRequest);

        if (fetchedRequest) {
          setActiveRequest(fetchedRequest);
        }
      } catch (error) {
        console.error("Failed to fetch active request:", error);
      }
    };

    fetchActiveRequest();
  }, []);

  const handleAcceptRequest = async () => {
    await updateRequestStatus(
      activeRequest?._id!,
      "completed",
      currentUser.id,
      `${currentUser.id}_${currentUser.firstName}`
    );
    setActiveTab("dashboard");
  };

  const formatName = (name: string) => {
    return name ? name.split("_")[1] : "";
  };

  const markers = useMemo(
    () =>
      activeRequest
        ? [
            {
              latitude: activeRequest.location.lat,
              longitude: activeRequest.location.long,
              popUp: capitalizeFirstLetter(activeRequest.callerName),
              type: "user" as const,
            },
            {
              latitude: activeRequest.driverLocation?.lat || 0,
              longitude: activeRequest.driverLocation?.long || 0,
              popUp: capitalizeFirstLetter(
                formatName(activeRequest?.driverName!)
              ),
              type: "driver" as const,
            },
          ]
        : [],
    [activeRequest]
  );

  const renderMap = () => {
    return (
      <div className="flex flex-col justify-start items-start text-start gap-6 p-6 bg-modalBackground rounded-2xl w-full h-screen shadow-2xl">
        <h2 className="text-xl font-bold">{t("admin-map-title")}</h2>
        {!activeRequest ? (
          <div>Loading...</div>
        ) : (
          <MapComponent
            markers={markers}
            latitude={activeRequest.location.lat}
            longitude={activeRequest.location.long}
            routes={true}
          />
        )}
      </div>
    );
  };

  const renderRouteDetails = () => {
    return (
      <div className="flex justify-start items-center text-center flex-col gap-6 p-6 bg-white rounded-2xl w-full h-fit shadow-xl">
        <h2 className="text-xl font-bold text-gray-800">
          {t("driver-track-route-title")}
        </h2>

        <div
          className={`flex gap-4 w-full ${
            currentRole === "driver" ? "flex-col" : "flex-col-reverse"
          }`}
        >
          <LocationItem
            type="driverLocation"
            location={activeRequest?.driverLocation?.address || ""}
          />
          <LocationItem
            type="userLocation"
            location={activeRequest?.location.address || ""}
          />
        </div>
      </div>
    );
  };

  const renderInfoDetails = () => {
    return (
      <div className="flex justify-between items-center text-center flex-row gap-6 p-6 bg-white rounded-2xl w-full h-fit shadow-xl">
        <h2 className="text-xl font-bold text-gray-800">
          {currentRole === "driver"
            ? `Caller: ${activeRequest?.callerName}`
            : `Driver: ${formatName(activeRequest?.driverName || "")}`}
        </h2>

        <div className={`flex flex-row gap-2 `}>
          <ChatIcon
            width={20}
            height={20}
            onClick={() => setActiveTab("messages")}
            customClassName="cursor-pointer"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-start w-full gap-4">
      <div className="flex flex-row items-start justify-between text-center w-full ">
        <h1 className="text-4xl w-full text-start">{t("track")}</h1>
        {currentUser.role === "driver" && (
          <Button
            text={t("confirm-arrival")}
            type="primary"
            onClick={handleAcceptRequest}
            customClassName="text-lg whitespace-nowrap "
          />
        )}
      </div>
      {activeRequest ? (
        <div className="flex flex-row gap-4 w-full h-full">
          {/* left side */}
          <div className="left-side flex flex-col gap-4 w-[30%]">
            {renderRouteDetails()}
            {renderInfoDetails()}
          </div>
          {/* right side */}
          <div className="right-side w-[70%]">{renderMap()}</div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 items-center justify-center w-full h-screen bg-white rounded-2xl">
          <p className="text-2xl text-secondary500">
            {t("no-active-request-message")}
          </p>
          <Button
            text={t("hero-button")}
            type="primary"
            onClick={() => navigate("/request-ambulance")}
            customClassName={" text-xl"}
          />
        </div>
      )}
    </div>
  );
};

export default Tracking;
