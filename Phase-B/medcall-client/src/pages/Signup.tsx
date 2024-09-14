import { useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import { route } from "preact-router";
import Button from "../components/Button";
import Divider from "../components/Divider";
import GoogleButton from "../components/GoogleButton";
import Input from "../components/Input";

import { SignUpFormData } from "../interfaces/types";
import Tab from "../components/Tab";
import { handleSignUp, isTokenValid } from "../utils/authHandles";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
  ZipIcon,
  PinIcon,
} from "../components/icons";
import Navbar from "../components/common/Navbar";
import { UserCredential } from "firebase/auth";
import { registerUser } from "../services/userService";
import { toast } from "react-toastify";
import { isValidPhoneNumber } from "../utils/helpers";

const SignUp = () => {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<"main" | "verify">("main");
  const [verifyType, setVerifyType] = useState<"email" | "google">("email");
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
  });

  const [googleUser, setGoogleUser] = useState<UserCredential | null>(null);
  const [googlePhoneNumber, setGooglePhoneNumber] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  //***************** handle form data
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

  const handleContinueClick = async () => {
    switch (activeTab) {
      case "driver": {
        if (
          !formData.firstName ||
          !formData.lastName ||
          !formData.phoneNumber ||
          !formData.email ||
          !formData.password ||
          !formData.confirmPassword
        ) {
          toast.error(t("fields-error"), {
            position: "bottom-center",
            hideProgressBar: true,
          });
          return;
        }
        setSignUpDriverForm(true);
        break;
      }
      case "user": {
        await handleSignUpClick();
        break;
      }
    }
  };

  const handleSignUpClick = async () => {
    const status = await handleSignUp(formData, activeTab);
    if (status) checkDataAndNavigate();
  };

  const handleVerifyClick = async () => {
    if (!googleUser) return;
    if (googlePhoneNumber === "") {
      toast.error(t("error-phone-required"), {
        position: "top-center",
        hideProgressBar: true,
      });
      return;
    }
    if (!isValidPhoneNumber(googlePhoneNumber)) {
      toast.error(t("error-invalid-phone"), {
        position: "top-center",
        hideProgressBar: true,
      });
      return;
    }
    if (verifyType === "google") {
      const user = googleUser.user;

      const newUser = {
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
        email: user.email || "",
        phoneNumber: googlePhoneNumber,
        role: "user",
        isGoogleSignIn: true,
      };

      const registeredUser = await registerUser(newUser);

      if (registeredUser) checkDataAndNavigate();
    } 
  };

  const checkDataAndNavigate = () => {
    const data = isTokenValid();
    if (data) {
      route("/dashboard");
    }
  };
  //***************** RENDER Forms

  const renderSignUp = () => {
    return (
      <>
        <h2 className="text-2xl md:text-4xl font-Pippins font-semibold m-0">
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
        <h2 className="text-2xl md:text-4xl font-Pippins font-semibold m-0">
          {t("one-last-step")}
        </h2>

        <div className={"flex flex-col gap-2 md:gap-4 w-full"}>
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
          </div>
        </div>
      </>
    );
  };

  const renderPhoneNumberForm = () => {
    return (
      <>
        <h2 className="text-2xl md:text-4xl font-Pippins font-semibold m-0">
          {t("one-last-step")}
        </h2>

        <Input
          type="text"
          placeholder={t("sign-up-phone-placeholder")}
          value={googlePhoneNumber}
          onChange={(e) =>
            setGooglePhoneNumber((e.target as HTMLInputElement).value)
          }
          leftIcon={<PhoneIcon />}
        />
      </>
    );
  };

  //***************** RENDER Screens
  const renderMainScreen = () => {
    return (
      <div className="box-modal shadow-2xl w-full md:w-2/4">
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
              onClick={
                signUpDriverFrom ? handleSignUpClick : handleContinueClick
              }
              customClassName={"font-bold text-xl"}
            />
          </div>
          <div className="text-sm md:text-base">
            <h2>
              {t("sign-up-nav-to")}
              <span
                className={"text-primary500 font-bold cursor-pointer"}
                onClick={() => route("/login")}
              >
                {t("sign-up-nav-to-text")}
              </span>
            </h2>
          </div>
        </div>

        {!signUpDriverFrom && (
          <div className={"flex flex-col gap-6 w-full"}>
            <Divider />
            <GoogleButton
              text="Sign Up with Google"
              type="signUp"
              setActiveModal={setActiveModal}
              setVerifyType={setVerifyType}
              setGoogleUser={setGoogleUser}
            />
          </div>
        )}
      </div>
    );
  };

  const renderVerifyScreen = () => {
    return (
      <div className="box-modal shadow-2xl w-full md:w-2/4">
        {verifyType === "google" ? renderPhoneNumberForm() : <></>}
        <div className={"flex flex-col gap-2 justify-center w-auto"}>
          <div className={"flex flex-row gap-2 justify-start w-full"}>
            <Button
              text={t("back-button")}
              type="secondary"
              onClick={() => setActiveModal("main")}
              customClassName={"text-xl"}
            />

            <Button
              text={t("sign-up-form-button")}
              type="primary"
              onClick={handleVerifyClick}
              customClassName={"font-bold text-xl"}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderPages = () => {
    switch (activeModal) {
      case "main":
        return renderMainScreen();
      case "verify":
        return renderVerifyScreen();
      default:
        return renderMainScreen();
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <section className="flex justify-center items-center px-6 my-8">
        {renderPages()}
      </section>
    </div>
  );
};

export default SignUp;
