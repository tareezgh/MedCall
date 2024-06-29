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
    const status = await handleSignUp(formData, activeTab);
    if (status) navigate("/dashboard");
  };

  const handleGoogleSignUp = () => {};

  return (
    <>
      <section className="py-16 flex justify-center items-center">
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
