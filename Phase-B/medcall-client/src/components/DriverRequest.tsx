import { useEffect, useState } from "preact/hooks";
import DriversTable from "./DriversTable";
import { useTranslation } from "react-i18next";
import { User } from "../interfaces/types";
import { getDrivers } from "../services/userService";

const DriverRequest = () => {
  const { t } = useTranslation();
  const [drivers, setDrivers] = useState<User[]>([]);

  useEffect(() => {
    const fetchPendingDrivers = async () => {
      try {
        const results = await getDrivers("pending");
        console.log("🚀 ~ fetchPendingDrivers ~ results:", results);

        if (results) {
          setDrivers(results.drivers);
        }
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      }
    };

    fetchPendingDrivers();
  }, []);

  return (
    <>
      <div className="mt-4 left-side flex flex-col gap-4">
        <h1 className="text-4xl w-full text-start text-black">
          {t("drivers-requests-title")}
        </h1>
        <div className="flex justify-start items-center text-center flex-col gap-6 p-6 bg-white rounded-2xl w-full h-fit shadow-xl">
          <DriversTable
            drivers={drivers}
            type={"request"}
            setDrivers={setDrivers}
          />
        </div>
      </div>
    </>
  );
};

export default DriverRequest;
