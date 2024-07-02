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
  FileIcon,
  ZipIcon,
  PinIcon,
} from "../components/icons";
import Tab from "../components/Tab";
import { handleSignUp } from "../utils/authHandles";

const SignUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [signUpDriverFrom, setSignUpDriverForm] = useState<boolean>(false);

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
    driversLicense: "", // TODO check this
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

  const handleSignUpClick = async () => {
    switch (activeTab) {
      case "driver": {
        setSignUpDriverForm(true);
        //TODO handle sign up driver
        break;
      }
      case "user": {
        const status = await handleSignUp(formData, activeTab);
        if (status) navigate("/dashboard");
        break;
      }
    }
  };

  const handleGoogleSignUp = () => {};

  const renderSignUp = () => {
    return (
      <>
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
          <div className="text-sm">
            <h2>{t("sign-up-policy")}</h2>
          </div>
        </div>
      </>
    );
  };

  const renderDriverSignUpForm = () => {
    return (
      <>
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
              leftIcon={<PinIcon />}
            />
            <Input
              type="text"
              placeholder={t("address")}
              value={formData.address}
              onChange={handleChange("address")}
              leftIcon={<PinIcon />}
            />
            <Input
              type="text"
              placeholder={t("zip-code")}
              value={formData.zipCode}
              onChange={handleChange("zipCode")}
              leftIcon={<ZipIcon />}
            />
            <Input
              type="text"
              placeholder={t("attach-license")}
              value={""} // TODO check the license content
              onChange={handleChange("driversLicense")}
              leftIcon={<FileIcon />}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <section className="flex justify-center items-center my-8">
        <div className="box-modal shadow-2xl w-2/4">
          {signUpDriverFrom ? renderDriverSignUpForm() : renderSignUp()}

          <div className={"flex flex-col gap-2 justify-center w-auto"}>
            <div className={"flex flex-row gap-2 justify-start w-full"}>
              {signUpDriverFrom && (
                <Button
                  text={t("back-button")}
                  type="secondary"
                  onClick={() => setSignUpDriverForm(false)}
                  customClassName={"text-xl"}
                />
              )}
              <Button
                text={t("sign-up-form-button")}
                type="primary"
                onClick={handleSignUpClick}
                customClassName={"font-bold text-xl"}
              />
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

          <div className={"flex flex-col gap-6 w-full"}>
            <Divider />
            <GoogleButton
              text="Sign Up with Google"
              onClick={handleGoogleSignUp}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
