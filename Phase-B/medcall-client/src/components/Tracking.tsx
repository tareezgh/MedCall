import { route } from "preact-router";
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

interface TrackingProps {
  setActiveTab: (tab: TabsTypes) => void;
  userAddress: string;
  userPosition: GeolocationCoordinates | null;
}

const Tracking = ({ setActiveTab }: TrackingProps) => {
  const { t } = useTranslation();
  const currentUser = useSelector((state: any) => state.currentUser);
  const [activeRequest, setActiveRequest] = useState<AmbulanceRequest | null>(
    null
  );
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const wsUrl = import.meta.env.VITE_WS_URL;
  const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";

  const currentRole = currentUser.role;

  useEffect(() => {
    if (!activeRequest && currentUser.role !== "driver") return;
    // WebSocket connection
    const connectWebSocket = () => {
      const newSocket = new WebSocket(
        `${wsProtocol}//${wsUrl}?userId=${encodeURIComponent(currentUser.id)}`
      );
      setSocket(newSocket);

      newSocket.addEventListener("open", () => {
        // console.log("WebSocket connection opened.");
      });

      newSocket.addEventListener("close", () => {
        // console.log("WebSocket connection closed. Reconnecting...");
        setTimeout(connectWebSocket, 5000); // Try to reconnect after 5 seconds
      });

      newSocket.addEventListener("error", () => {
        // console.error("WebSocket error:", error);
      });
    };

    connectWebSocket();

    // Cleanup on component unmount
    return () => {
      socket?.close();
    };
  }, [currentUser.id, wsUrl]);

  useEffect(() => {
    const fetchActiveRequest = async () => {
      try {
        const fetchedRequest = await getActiveRequest(currentUser.id);
        // console.log("Fetched request:", fetchedRequest);

        if (fetchedRequest) {
          setActiveRequest(fetchedRequest);
        }
      } catch (error) {
        // console.error("Failed to fetch active request:", error);
      }
    };

    fetchActiveRequest();
  }, []);

  useEffect(() => {
    if (!activeRequest && currentUser.role !== "driver") return;

    const sendDriverLocation = () => {
      if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition((position) => {
          const { latitude, longitude } = position.coords;
          // console.log("🚀 ~ watchId ~ latitude, longitude:", latitude, longitude)

          if (socket?.readyState === WebSocket.OPEN) {
            socket.send(
              JSON.stringify({
                requestId: activeRequest?._id,
                driverLocation: { lat: latitude, long: longitude },
              })
            );
          } else {
            // console.error("WebSocket is not open. State:", socket?.readyState);
          }
        });

        return () => {
          navigator.geolocation.clearWatch(watchId);
        };
      }
    };

    // Send initial location immediately
    const cleanupWatch = sendDriverLocation();

    // Set interval to send location every 2 minutes (120000 milliseconds)
    const intervalId = setInterval(sendDriverLocation, 120000);
    // console.log("🚀 ~ useEffect ~ intervalId:", intervalId);

    // Cleanup on component unmount
    return () => {
      clearInterval(intervalId);
      cleanupWatch && cleanupWatch();
    };
  }, [activeRequest, currentUser.id, socket]);

  useEffect(() => {
    if (!socket) return;
    const handleOpen = () => {
      // console.log("WebSocket connection opened.");
    };

    const handleClose = () => {
      // console.log("WebSocket connection closed.");
    };

    const handleError = () => { //error: Event
      // console.error("WebSocket error:", error);
    };

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("close", handleClose);
    socket.addEventListener("error", handleError);

    return () => {
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("close", handleClose);
      socket.removeEventListener("error", handleError);
      socket.close(); // Make sure to close the socket when the component unmounts
    };
  }, [socket]);

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
      <div className="flex flex-col justify-start items-start text-start gap-6 p-6 bg-modalBackground rounded-2xl w-full h-screen shadow-2xl z-10">
        <h2 className="text-xl font-bold">{t("admin-map-title")}</h2>
        {!activeRequest ? (
          <div>{t("loading")}</div>
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
      <div className="flex flex-col gap-4 md:flex-row items-start justify-between text-center w-full ">
        <h1 className="text-3xl md:text-4xl w-full text-start">{t("track")}</h1>
        {currentUser.role === "driver" && activeRequest && (
          <Button
            text={t("confirm-arrival")}
            type="primary"
            onClick={handleAcceptRequest}
            customClassName="text-lg whitespace-nowrap "
          />
        )}
      </div>
      {activeRequest ? (
        <div className="flex flex-col md:flex-row gap-4 w-full h-full">
          {/* left side */}
          <div className="left-side flex flex-col gap-4 w-full md:w-[30%]">
            {renderRouteDetails()}
            {renderInfoDetails()}
          </div>
          {/* right side */}
          <div className="right-side w-full md:w-[70%]">{renderMap()}</div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 items-center justify-center w-full h-screen bg-white rounded-2xl">
          <p className="text-2xl text-secondary500">
            {t("no-active-request-message")}
          </p>
          <Button
            text={t("hero-button")}
            type="primary"
            onClick={() => route("/request-ambulance")}
            customClassName={" text-xl"}
          />
        </div>
      )}
    </div>
  );
};

export default Tracking;
