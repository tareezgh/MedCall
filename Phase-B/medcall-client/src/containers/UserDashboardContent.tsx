import { useEffect, useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import { route } from "preact-router";
import Button from "../components/Button";
import HistoryItem from "../components/HistoryItem";
import { PlusIcon } from "../components/icons";
import { getActiveRequest, getRequestById } from "../services/requestService";
import { AmbulanceRequest, TabsTypes } from "../interfaces/types";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../utils/helpers";
import { saveActiveRequest, saveStartingRequest } from "../redux/Slicers";

interface UserDashboardContentProps {
  setActiveTab: (tab: TabsTypes) => void;
}

const UserDashboardContent = ({ setActiveTab }: UserDashboardContentProps) => {
  const dispatch = useDispatch();
  const activeRequest: AmbulanceRequest | null = useSelector(
    (state: any) => state.requests.activeRequest
  );
  const startingRequest: AmbulanceRequest | null = useSelector(
    (state: any) => state.requests.startingRequest
  );
  const { t } = useTranslation();

  const [userRequests, setUserRequests] = useState<any[]>([]);
  const currentUser = useSelector((state: any) => state.currentUser);

  useEffect(() => {
    const fetchActiveRequest = async () => {
      try {
        if (!activeRequest) {
          const fetchedRequest = await getActiveRequest(currentUser.id);
          // console.log("Fetched request:", fetchedRequest);

          if (fetchedRequest) {
            dispatch(saveStartingRequest(null)); // Reset startingRequest if there's an active one
            dispatch(saveActiveRequest(fetchedRequest)); // Dispatch active request to Redux
          } else {
            const fetchedStartingRequest = await getActiveRequest(
              currentUser.id,
              "starting"
            );
            dispatch(saveActiveRequest(null)); // Reset activeRequest if there's none
            dispatch(saveStartingRequest(fetchedStartingRequest)); // Dispatch starting request to Redux
          }
        }
      } catch (error) {
        // console.error("Failed to fetch active request:", error);
      }
    };

    const fetchUserRequests = async () => {
      try {
        const requests = await getRequestById(currentUser.id);
        // console.log("🚀 ~ fetchUserRequests ~ requests:", requests);
        if (requests) {
          setUserRequests(requests);
        }
      } catch (error) {
        // console.error("Failed to fetch user requests:", error);
      }
    };

    fetchActiveRequest();
    fetchUserRequests();
  }, []);

  const renderActiveRequest = () => {
    return (
      <>
        <div className="flex flex-col justify-start items-center text-center gap-6 p-6 bg-modalBackground rounded-2xl w-full h-fit shadow-xl">
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="text-xl md:text-3xl font-bold">
              {t("active-request.title")}
            </h2>
            <h5 className="text-lg md:text-xl">
              {t("active-request.subtitle")}
            </h5>
          </div>
          <Button
            text={t("active-request.track-now-button")}
            type="primary"
            onClick={() => setActiveTab("tracking")}
            customClassName="text-xl md:text-2xl custom-green-button"
          />
        </div>
      </>
    );
  };

  const renderStartingRequest = () => {
    return (
      <>
        <div className="flex flex-col justify-start items-center text-center gap-6 p-6 bg-modalBackground rounded-2xl w-full h-fit shadow-xl">
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="text-2xl md:text-3xl font-bold">
              {t("starting-request.title")}
            </h2>
            <h5 className="text-base md:text-xl">
              {t("starting-request.subtitle")}
            </h5>
          </div>
        </div>
      </>
    );
  };

  const renderNewRequest = () => {
    return (
      <>
        <div className="flex flex-col justify-center items-center text-center  gap-6 p-6 bg-modalBackground rounded-2xl w-full h-fit shadow-xl">
          <div className="flex justify-center items-center h-12 w-12 rounded-full border-2 border-secondary500 opacity-50">
            <PlusIcon width={37} height={36} />
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="text-2xl md:text-3xl font-bold">
              {t("new-request.title")}
            </h2>
            <h5 className="text-lg md:text-xl w-[65%]">
              {t("new-request.subtitle")}
            </h5>
          </div>
          <Button
            text={t("new-request.order-now-button")}
            type="primary"
            onClick={() => route("/request-ambulance")}
            customClassName="text-xl md:text-2xl"
          />
        </div>
      </>
    );
  };

  const renderHistory = () => {
    return (
      <>
        <div className="flex flex-col justify-start text-start gap-8 p-6 bg-modalBackground rounded-2xl w-full h-fit shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("history.title")}
          </h2>
          {userRequests.length > 0 ? (
            <div className="flex flex-col gap-4">
              {userRequests
                .filter((request) => request.status === "completed")
                .map((request, index) => (
                  <HistoryItem
                    key={index}
                    date={new Date(request.createdAt).toLocaleDateString()}
                    typeOfEmergency={capitalizeFirstLetter(
                      request.emergencyType
                    )}
                    location={request.location.address}
                  />
                ))}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full text-xl text-black">
              {t("empty-history")}
            </div>
          )}
        </div>
      </>
    );
  };
  return (
    <>
      <div className="left-side flex flex-col gap-4 w-full md:w-1/2">
        {activeRequest && renderActiveRequest()}
        {startingRequest && renderStartingRequest()}
        {!activeRequest && !startingRequest && renderNewRequest()}
      </div>
      <div className="right-side w-full md:w-1/2">{renderHistory()}</div>
    </>
  );
};

export default UserDashboardContent;
