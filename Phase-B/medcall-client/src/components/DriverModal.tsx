import { useState } from "preact/hooks";
import { EditDriverData, User } from "../interfaces/types";
import { useTranslation } from "react-i18next";
import { UserIcon, PhoneIcon, MailIcon, PinIcon, ZipIcon } from "./icons";
import Input from "./Input";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { handleEditDriver } from "../utils/authHandles";

interface ModalProps {
  onClose: () => void;
  driver: User | null;
  onSave: (updatedDriver: User) => void;
}

const DriverModal = ({ onClose, driver, onSave }: ModalProps) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: driver?.firstName || "",
    lastName: driver?.lastName || "",
    phoneNumber: driver?.phoneNumber || "",
    email: driver?.email || "",
    city: driver?.city || "",
    address: driver?.address || "",
    zipCode: driver?.zipCode || "",
    driverStatus: driver?.driverStatus || "",
  });

  const handleChange =
    (field: keyof EditDriverData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: (e.target as HTMLInputElement).value,
      }));
    };

  const handleStatusChange = (status: string) => {
    setFormData((prevData) => ({
      ...prevData,
      driverStatus: status,
    }));
  };

  const handleSave = async () => {
    if (driver) {
      await handleEditDriver(driver?._id!, formData);
      onSave({ ...driver, ...formData });
    }
    onClose();
  };

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col gap-8 justify-center items-center bg-white p-6 mx-3 rounded-lg shadow-lg w-full md:w-[60%]">
        <h1 className="text-4xl w-full text-center text-black">
          {t("edit-profile")}
        </h1>
        <div className={"flex flex-col gap-2 w-full space-y-4"}>
          <div className={"flex flex-row gap-4 justify-between w-full"}>
            <Input
              type="text"
              placeholder={t("sign-up-first-name-placeholder")}
              value={formData.firstName}
              onChange={handleChange("firstName")}
              leftIcon={<UserIcon />}
            />
            <Input
              type="text"
              placeholder={t("sign-up-last-name-placeholder")}
              value={formData.lastName}
              onChange={handleChange("lastName")}
              leftIcon={<UserIcon />}
            />
          </div>
          <Input
            type="text"
            placeholder={t("sign-up-phone-placeholder")}
            value={formData.phoneNumber}
            onChange={handleChange("phoneNumber")}
            leftIcon={<PhoneIcon />}
          />
          <Input
            type="email"
            placeholder={t("sign-up-email-placeholder")}
            value={formData.email}
            onChange={handleChange("email")}
            leftIcon={<MailIcon />}
            disabled={driver?.isGoogleSignIn}
            customClassName={`${driver?.isGoogleSignIn ? "opacity-50" : ""}`}
          />
          <Input
            type="text"
            placeholder={t("sign-up-city-placeholder")}
            value={formData.city}
            onChange={handleChange("city")}
            leftIcon={<PinIcon />}
          />
          <Input
            type="text"
            placeholder={t("sign-up-address-placeholder")}
            value={formData.address}
            onChange={handleChange("address")}
            leftIcon={<PinIcon />}
          />
          <Input
            type="text"
            placeholder={t("sign-up-zip-code-placeholder")}
            value={formData.zipCode}
            onChange={handleChange("zipCode")}
            leftIcon={<ZipIcon />}
          />
          <Dropdown
            options={["pending", "accept", "decline", "suspended"]}
            value={formData.driverStatus}
            onChange={handleStatusChange}
            placeholder={t("driver-status-placeholder")}
          />
        </div>
        <div className="flex justify-center gap-4">
          <Button
            text="Close"
            type="secondary"
            onClick={onClose}
            customClassName={"text-lg"}
          />
          <Button
            text="Save"
            type="primary"
            onClick={handleSave}
            customClassName={"text-xl"}
          />
        </div>
      </div>
    </section>
  );
};

export default DriverModal;
