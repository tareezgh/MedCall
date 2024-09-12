import DriversTable from "./DriversTable";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "preact/hooks";
import { User } from "../interfaces/types";
import { getDrivers } from "../services/userService";

const AdminEdit = () => {
  const { t } = useTranslation();
  const [drivers, setDrivers] = useState<User[]>([]);
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const results = await getDrivers();

        if (results) {
          const filteredDrivers = results.drivers.filter(
            (driver: User) =>
              driver.driverStatus !== "pending" &&
              driver.driverStatus !== "decline"
          );
          setDrivers(filteredDrivers);
        }
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <>
      <div className="mt-4 left-side flex flex-col gap-4 h-screen">
        <h1 className="text-4xl w-full text-start text-black">
          {t("edit-drivers-title")}
        </h1>
        <div className="flex justify-start items-center text-center flex-col gap-6 px-6 py-8 bg-white rounded-2xl w-full h-fit shadow-xl">
          <DriversTable
            drivers={drivers}
            type={"edit"}
            setDrivers={setDrivers}
          />
        </div>
      </div>
    </>
  );
};

export default AdminEdit;
