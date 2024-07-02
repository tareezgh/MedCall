import { useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import Divider from "../components/Divider";
import GoogleButton from "../components/GoogleButton";
import Input from "../components/Input";

import { SignUpFormData } from "../interfaces/types";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
  // ZipIcon,
  //! PinIcon is not exported ?!?!?
  // PinIcon,
} from "../components/icons";
import Tab from "../components/Tab";
import { handleSignUp } from "../utils/authHandles";

const SignUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<"user" | "driver">("user");
  const tabs = [
    { title: t("sign-up-tab-1"), key: "user" },
    { title: t("sign-up-tab-2"), key: "driver" },
  ];
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    address: "",
    zipCode: "",
    driversLicense:"", // TODO check this
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleChange =
    (field: keyof SignUpFormData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
          ...prevData,
          [field]: (e.target as HTMLInputElement).value,
        }));
      };

  const toggleVisibility = (field: "password" | "confirmPassword") => () => {
    if (field === "password") {
      setIsPasswordVisible((prev) => !prev);
    } else {
      setIsConfirmPasswordVisible((prev) => !prev);
    }
  };

  // bool for driver signing up option
  const [signupDriver, setSignupDriver] = useState<boolean>(false);

  const handleSignUpClick = async () => {
    const status = await handleSignUp(formData, activeTab);
    switch (activeTab) {
      case ("driver"):
        {
          if (status) setSignupDriver(true);
          console.log("driver");
          break;
        }
        case "user":
          {
          if (status) navigate("/dashboard");
          console.log("user");
          break;
        }
    }

  };

  const handleGoogleSignUp = () => { };

  const renderSignup = () => {
    return (
      <>
        <section className="flex justify-center items-center">
          <div className="box-modal shadow-2xl">
            <h2 className="text-4xl font-Pippins font-semibold m-0">
              {t("sign-up-form-title")}
            </h2>
            <div className="flex gap-4">
              {tabs.map((tab) => (
                <Tab
                  key={tab.key}
                  title={tab.title}
                  type="primary"
                  active={activeTab === tab.key}
                  onClick={() => setActiveTab(tab.key as "user" | "driver")}
                />
              ))}
            </div>

            <div className={"flex flex-col gap-4 w-full"}>
              <div className={"flex flex-col gap-4 w-full"}>
                <div className={"flex flex-row gap-4 justify-between "}>
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
                  type="text"
                  placeholder={t("sign-up-email-placeholder")}
                  value={formData.email}
                  onChange={handleChange("email")}
                  leftIcon={<MailIcon />}
                />
                <Input
                  placeholder={t("sign-up-password-placeholder")}
                  type={isPasswordVisible ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange("password")}
                  leftIcon={<LockIcon />}
                  rightIcon={isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                  onRightIconClick={toggleVisibility("password")}
                />
                <Input
                  placeholder={t("sign-up-confirm-password-placeholder")}
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  leftIcon={<LockIcon />}
                  rightIcon={
                    isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />
                  }
                  onRightIconClick={toggleVisibility("confirmPassword")}
                />
              </div>
            </div>
        
          </div>
        </section>
      </>
    );
  }

  const renderDriverSignup = () => {
    return (
      <>
        <section className="flex flex-col justify-center items-center">
          <div className="box-modal shadow-2xl">

            <h2 className="text-4xl font-Pippins font-semibold m-0">
            {t("one-last-step")}
            </h2>

            <div className={"flex flex-col gap-4 w-full"}>
              <div className={"flex flex-col gap-4 w-full"}>

                <Input
                  type="text"
                  placeholder={t("city")}
                  value={formData.city}
                  onChange={handleChange("city")}
                  leftIcon={<PhoneIcon />}
                />
                <Input
                  type="text"
                  placeholder={t("address")}
                  value={formData.address}
                  onChange={handleChange("address")}
                  leftIcon={<MailIcon />}
                />
                <Input
                  type="text"
                  placeholder={t("zip-code")}
                  value={formData.zipCode}
                  onChange={handleChange("zipCode")}
                  leftIcon={<PhoneIcon />}
                />
                <Input
                  type="text"
                  placeholder={t("attach-license")}
                  value={""} // TODO check the license content
                  onChange={handleChange("driversLicense")}
                  leftIcon={<MailIcon />}
                />

              </div>
            </div>
          </div>
        </section >
      </>
    );
  }

  return (
    <>
      <section className="flex justify-center items-center">
        <div className="box-modal shadow-2xl">
          {signupDriver ? renderDriverSignup() : renderSignup()}

          <div className="text-sm">
            <h2>{t("sign-up-policy")}</h2>
          </div>
          <div className={"flex flex-col gap-2 justify-center w-auto"}>
            <Button
              text={t("sign-up-form-button")}
              type="primary"
              onClick={handleSignUpClick}
              customClassName={"font-bold text-xl"}
            />
          </div>
          <div className={"flex flex-row justify-start w-auto"}>
            {signupDriver && (
              <Button
                text={t("back-button")}
                type="secondary"
                onClick={() => setSignupDriver(false)}
                customClassName={"text-xl"}
              />
            )}
          </div>

          <div className="text-base">
            <h2>
              {t("sign-up-nav-to")}
              <span
                className={"text-primary500 font-bold cursor-pointer"}
                onClick={() => navigate("/login")}
              >
                {t("sign-up-nav-to-text")}
              </span>
            </h2>
          </div>

        </div>
      </section>
    </>
  );

};

export default SignUp;
