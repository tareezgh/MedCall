import { EditIcon, DeleteIcon } from "./icons";
import Button from "./Button";
import { useTranslation } from "react-i18next";
import { User } from "../interfaces/types";
import { changeDriverStatus, deleteDriver } from "../services/userService";
import { useState } from "preact/hooks";
import DriverModal from "./DriverModal";

interface DriversTableProps {
  drivers: Partial<User[]>;
  type: string;
  setDrivers: React.Dispatch<React.SetStateAction<User[]>>;
}

const DriversTable = ({
  drivers = [],
  type,
  setDrivers,
}: DriversTableProps) => {
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<User | null>(null);

  if (!Array.isArray(drivers)) {
    return <p>{t("no-drivers-found")}</p>; //TODO
  }

  const handleChangeStatus = async (driverId: string, status: string) => {
    try {
      await changeDriverStatus(driverId, status);
      if (status === "accept") {
        setDrivers((prevDrivers) =>
          prevDrivers.filter((driver) => driver._id !== driverId)
        );
      }
    } catch (error) {
      console.error("Failed to change driver status:", error);
    }
  };

  const handleDeleteDriver = async (driverId: string) => {
    try {
      const response = await deleteDriver(driverId);
      console.log("🚀 ~ handleDeleteDriver ~ response:", response);
      if (response?.data.status === "success") {
        setDrivers((prevDrivers) =>
          prevDrivers.filter((driver) => driver._id !== driverId)
        );
      }
    } catch (error) {
      console.error("Failed to change driver status:", error);
    }
  };

  const handleEditClick = (driver: User) => {
    setSelectedDriver(driver);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedDriver(null);
  };

  const handleSave = (updatedDriver: User) => {
    setDrivers((prevDrivers) =>
      prevDrivers.map((driver) =>
        driver._id === updatedDriver._id ? updatedDriver : driver
      )
    );
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white rounded-2xl shadow">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
            <th className="py-3 px-6 text-left rounded-tl-2xl">
              {t("full-name")}
            </th>
            <th className="py-3 px-6 text-left">{t("phone")}</th>
            <th className="py-3 px-6 text-left">
              {t("login-email-placeholder")}
            </th>
            <th className="py-3 px-6 text-left">{t("city")}</th>
            <th className="py-3 px-6 text-center rounded-tr-2xl">
              {t("action")}
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {drivers.map((driver, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {driver?.firstName} {driver?.lastName}
              </td>
              <td className="py-3 px-6 text-left">{driver?.phoneNumber}</td>
              <td className="py-3 px-6 text-left">{driver?.email}</td>
              <td className="py-3 px-6 text-left">{driver?.city}</td>
              <td className="py-3 px-6 text-center">
                {type === "edit" ? (
                  <div className="flex item-center justify-center gap-4 ">
                    <EditIcon
                      onClick={() => handleEditClick(driver!)}
                      customClassName="cursor-pointer"
                    />
                    <DeleteIcon
                      onClick={() => handleDeleteDriver(driver?._id!)}
                      customClassName="cursor-pointer"
                    />
                  </div>
                ) : (
                  <div className="flex item-center justify-center gap-4">
                    <Button
                      text={t("approve-btn")}
                      type="primary"
                      onClick={() => handleChangeStatus(driver?._id!, "accept")}
                      customClassName={"text-xs bg-blue-900 hover:bg-blue-950"}
                    />
                    <Button
                      text={t("decline-request")}
                      type="secondary"
                      onClick={() =>
                        handleChangeStatus(driver?._id!, "decline")
                      }
                      customClassName={"text-xs bg-white hover:bg-slate-400"}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <DriverModal
          onClose={handleModalClose}
          driver={selectedDriver}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default DriversTable;
