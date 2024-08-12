import { useTranslation } from "react-i18next";
import Input from "./Input";
import Button from "./Button";
import { PhoneIcon, MailIcon, UserIcon } from "./icons";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'preact/hooks';

const Profile = () => {
  const { t } = useTranslation();
  const currentUser = useSelector((state: any) => state.currentUser);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000); // Update every minute

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  return (
    <>
      <section className="flex flex-col justify-center items-center">
  <h1 className="text-4xl w-full text-start text-black">
    {t("edit-profile")}
  </h1>
  <div className="box-modal shadow-2xl mt-4 w-full h-full"> {/* Reduced mt-16 to mt-4 */}
    <div className="flex flex-col items-start space-y-1">
      <h2 className="text-3xl font-bold">
        {currentUser.firstName} {currentUser.lastName}
      </h2>
      <h5 className="text-sm">{currentTime} local time</h5>
    </div>
    <div className={"flex flex-col gap-4 w-2/4 space-y-4"}>
      <div className={"flex flex-row gap-4 justify-between"}>
        <Input
          type="text"
          placeholder={t("sign-up-first-name-placeholder")}
          value={currentUser.firstName}
          onChange={() => { }}
          leftIcon={<UserIcon />}
        />
        <Input
          type="text"
          placeholder={t("sign-up-last-name-placeholder")}
          value={currentUser.lastName}
          onChange={() => { }}
          leftIcon={<UserIcon />}
        />
      </div>
      <Input
        type="text"
        placeholder={t("sign-up-phone-placeholder")}
        value={currentUser.phoneNumber}
        onChange={() => { }}
        leftIcon={<PhoneIcon />}
      />
      <Input
        type="text"
        placeholder={t("sign-up-email-placeholder")}
        value={currentUser.email}
        onChange={() => { }}
        leftIcon={<MailIcon />}
      />
    </div>
    <Button
      text="Save Changes"
      type="primary"
      onClick={() => { }}
      customClassName={"text-xl"}
    />
  </div>
</section>

    </>
  );
};

export default Profile;
