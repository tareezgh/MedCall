import DriversTable from "./DriversTable";
import Button from "./Button";
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
        console.log("🚀 ~ getDrivers ~ results:", results);

        if (results) {
          setDrivers(results.drivers);
        }
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <>
      <div className="mt-4 left-side flex flex-col gap-4">
        <h1 className="text-4xl w-full text-start text-black">
          {t("edit-drivers-title")}
        </h1>
        <div className="flex justify-start items-center text-center flex-col gap-6 p-6 bg-white rounded-2xl w-full h-fit shadow-xl">
          <DriversTable drivers={drivers} type={"edit"} />
          <div className="flex justify-end mt-4">
            <Button
              text={t("save-button")}
              type="primary"
              onClick={() => {}}
              customClassName={"text-base"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEdit;
