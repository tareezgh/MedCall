import { useTranslation } from "react-i18next";
import Input from "./Input";
import Button from "./Button";
import { PhoneIcon, MailIcon, UserIcon } from "./icons";
import { useSelector } from "react-redux";
import { useState, useEffect } from "preact/hooks";
import { handleEditProfile } from "../utils/authHandles";
import { EditProfileData } from "../interfaces/types";

const Profile = () => {
  const { t } = useTranslation();
  const currentUser = useSelector((state: any) => state.currentUser);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    phoneNumber: currentUser.phoneNumber || "",
    email: currentUser.email || "",
  });
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 60000); // Update every minute

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  const handleChange =
    (field: keyof EditProfileData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: (e.target as HTMLInputElement).value,
      }));
    };

  const handleSaveClick = async () => {
    await handleEditProfile(currentUser.id, formData);
  };

  return (
    <>
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-4xl w-full text-start text-black">
          {t("edit-profile")}
        </h1>
        <div className="box-modal shadow-2xl mt-4 w-full h-full">
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="text-3xl font-bold">
              {currentUser.firstName} {currentUser.lastName}
            </h2>
            <h5 className="text-base">{currentTime} local time</h5>
          </div>
          <div className={"flex flex-col gap-4 w-2/4 space-y-4"}>
            <div className={"flex flex-row gap-4 justify-between"}>
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
              disabled={currentUser.isGoogleSignIn}
              customClassName={`${
                currentUser.isGoogleSignIn ? "opacity-50" : ""
              }`}
            />
          </div>
          <Button
            text="Save Changes"
            type="primary"
            onClick={handleSaveClick}
            customClassName={"text-xl"}
          />
        </div>
      </section>
    </>
  );
};

export default Profile;
