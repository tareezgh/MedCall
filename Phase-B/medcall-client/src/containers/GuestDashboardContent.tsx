import { useEffect, useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import { route } from "preact-router";
import Button from "../components/Button";

import { PlusIcon } from "../components/icons";
import { getGuestRequest } from "../services/requestService";
import { AmbulanceRequest } from "../interfaces/types";

const GuestDashboardContent = () => {
  const { t } = useTranslation();
  const [activeRequest, setActiveRequest] = useState<AmbulanceRequest | null>(
    null
  );
  const [startingRequest, setStartingRequest] =
    useState<AmbulanceRequest | null>(null);

  useEffect(() => {
    const fetchGuestRequest = async () => {
      try {
        const savedPhoneNumber = localStorage.getItem("guestPhoneNumber");

        const fetchedRequest = await getGuestRequest(savedPhoneNumber!);
        console.log("Fetched request:", fetchedRequest);

        if (fetchedRequest) {
          setStartingRequest(null);
          setActiveRequest(fetchedRequest);
        } else {
          const fetchedRequest = await getGuestRequest(
            savedPhoneNumber!,
            "starting"
          );
          setActiveRequest(null);
          setStartingRequest(fetchedRequest);
        }
      } catch (error) {
        console.error("Failed to fetch active request:", error);
      }
    };

    fetchGuestRequest();
  }, []);

  const renderActiveRequest = () => {
    return (
      <>
        <div className="flex flex-col justify-start items-center text-center gap-6 p-6 bg-modalBackground rounded-2xl w-full h-fit shadow-xl">
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="text-3xl font-bold">{t("active-request.title")}</h2>
            <h5 className="text-xl">{t("active-request.guest-subtitle")}</h5>
          </div>
          <Button
            text={t("active-request.guest-button")}
            type="primary"
            onClick={() => route("/sign-up")}
            customClassName="text-2xl"
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
            <h2 className="text-3xl font-bold">
              {t("starting-request.title")}
            </h2>
            <h5 className="text-xl">{t("starting-request.subtitle")}</h5>
          </div>
        </div>
      </>
    );
  };

  const renderNewRequest = () => {
    return (
      <>
        <div className="flex flex-col justify-center items-center text-center gap-6 p-6 bg-modalBackground rounded-2xl w-full h-fit shadow-xl">
          <div className="flex justify-center items-center h-12 w-12 rounded-full border-2 border-secondary500 opacity-50">
            <PlusIcon width={37} height={36} />
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="text-3xl font-bold">{t("new-request.title")}</h2>
            <h5 className="text-xl w-[65%]">{t("new-request.subtitle")}</h5>
          </div>
          <Button
            text={t("new-request.order-now-button")}
            type="primary"
            onClick={() => route("/request-ambulance")}
            customClassName="text-2xl"
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        {activeRequest && renderActiveRequest()}
        {startingRequest && renderStartingRequest()}
        {!activeRequest && renderNewRequest()}
      </div>
    </>
  );
};

export default GuestDashboardContent;
