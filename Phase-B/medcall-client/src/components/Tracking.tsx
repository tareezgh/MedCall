import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Button from "./Button";
import {
  getActiveRequest,
  updateRequestStatus,
} from "../services/requestService";
import { useEffect, useMemo, useState } from "preact/hooks";
import { AmbulanceRequest } from "../interfaces/types";
import LocationItem from "./LocationItem";
import { AddressIcon, ChatIcon } from "./icons";
import MapComponent from "./Map";
import { capitalizeFirstLetter } from "../utils/helpers";

const Tracking = () => {
  const { t } = useTranslation();
  const currentUser = useSelector((state: any) => state.currentUser);
  const [activeRequest, setActiveRequest] = useState<AmbulanceRequest | null>(
    null
  );
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

  const markers = useMemo(
    () =>
      activeRequest
        ? [
            {
              latitude: activeRequest.location.lat,
              longitude: activeRequest.location.long,
              popUp: capitalizeFirstLetter(activeRequest.emergencyType),
            },
          ]
        : [],
    [activeRequest]
  );

  const renderMap = () => {
    return (
      <>
        <div className="flex flex-col justify-start items-start text-start gap-6 p-6 bg-modalBackground rounded-2xl w-full min-h-80 shadow-2xl">
          <h2 className="text-xl font-bold">{t("admin-map-title")}</h2>
          <MapComponent
            markers={markers}
            latitude={activeRequest?.location.lat || 0}
            longitude={activeRequest?.location.long || 0}
          />
        </div>
      </>
    );
  };

  const renderRouteDetails = () => {
    return (
      <div className="flex justify-start items-center text-center flex-col gap-6 p-6 bg-white rounded-2xl w-full h-fit shadow-xl">
        <h2 className="text-xl font-bold text-gray-800">
          {t("driver-track-route-title")}
        </h2>

        <div className="flex flex-col gap-4 w-full">
          <LocationItem type="driverLocation" location="" />
          <LocationItem type="userLocation" location="" />
        </div>
      </div>
    );
  };

  const renderDriverDetails = () => {
    return (
      <div className="flex justify-between items-center text-center flex-row gap-6 p-6 bg-white rounded-2xl w-full h-fit shadow-xl">
        <h2 className="text-xl font-bold text-gray-800">
          {currentUser.firstName + " " + currentUser.lastName}
        </h2>

        <div className="flex flex-row gap-2">
          <AddressIcon width={20} height={20} />
          <ChatIcon width={20} height={20} />
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
            text={t("accept-request")}
            type="primary"
            onClick={() =>
              updateRequestStatus(
                "",
                "active",
                `${currentUser.id}_${currentUser.firstName}`
              )
            }
            customClassName="text-lg whitespace-nowrap "
          />
        )}
      </div>
      <div className="flex flex-row gap-4 w-full h-full">
        {/* left side */}
        <div className="left-side flex flex-col gap-4 w-[30%]">
          {renderRouteDetails()}
          {renderDriverDetails()}
        </div>
        {/* right side */}
        <div className="right-side w-[70%]">{renderMap()}</div>
      </div>
    </div>
  );
};

export default Tracking;
