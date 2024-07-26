import React, { ReactNode } from 'react';
import { useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router";
import { ResetPasswordFormData } from "../interfaces/types";
import Button from "../components/Button";
import Input from "../components/Input";
import { MailIcon, EyeIcon, EyeOffIcon, LockIcon } from "../components/icons";
import OTPInput from '../components/OTPInput';

type ScreenContainerProps = {
  children: ReactNode;
};

const ScreenContainer = ({ children }: ScreenContainerProps) => (
  <section className="flex justify-center items-center my-12 py-10">
    <div className="flex flex-col justify-center items-center text-center gap-6 p-6 bg-modalBackground rounded-2xl min-w-fit min-h-fit shadow-xl">
      {children}
    </div>
  </section>
);

type ScreenHeaderProps = {
  title: string;
  description: string;
};

const ScreenHeader = ({ title, description }: ScreenHeaderProps) => (
  <div className="flex flex-col justify-center items-center gap-2">
    <h2 className="text-3xl font-bold py-2">{title}</h2>
    <h5 className="py-2">{description}</h5>
  </div>
);

const ResetPassword = () => {
  // const navigate = useNavigate();
  const { t } = useTranslation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  //? is remeberMe necessary?
  const [rememberMe, setRememberMe] = useState(false);

  const [activeTab, setActiveTab] = useState("screen1");

  const [formData, setFormData] = useState<ResetPasswordFormData>({
    email: "",
    password: "",
    resetPassword: "",
  });

  const handleChange = (field: keyof ResetPasswordFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: (e.target as HTMLInputElement).value,
    }));
  };

  const toggleFields = (field: "password" | "rememberMe") => () => {
    if (field === "password") {
      setIsPasswordVisible((prev) => !prev);
    } else {
      setRememberMe((prev) => !prev);
    }
  };

  const renderScreen1 = () => {
    return (
      <ScreenContainer>
        <ScreenHeader
          title={t("reset-pass")}
          description={t("enter-email-reset")}
        />
        <Input
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange("email")}
          leftIcon={<MailIcon />}
          customClassName="min-w-[500px]"
        />
        <Button
          text={t("submit-request-button")} //this says continue
          type="primary"
          onClick={() => setActiveTab("screen2")}
          customClassName="text-2xl custom-red-button w-1/2 mt-4 mb-4"
        />
      </ScreenContainer>
    );
  };

  const renderScreen2 = () => {
    return (
      <ScreenContainer>
        <ScreenHeader
          title={t("otp-title")}
          description={`${t("otp-sent1")} ${formData.email}. ${t("otp-sent2")}`}
        />
        <OTPInput />
        {/* use otp here */}
        <Button
          text={t("verify")}
          type="primary"
          onClick={() => setActiveTab("screen3")}
          customClassName="text-2xl custom-red-button w-1/2"
        />
        <Button
          text={t("back-button")}
          type="secondary"
          onClick={() => setActiveTab("screen1")}
          customClassName="text-lg custom-red-button"
        />
        <div className="text-base">
          <h2>
            {t("no-code")}
            <span
              className="text-primary500 font-bold cursor-pointer"
              onClick={() => { }}
            >
              {t("send-again")}
            </span>
          </h2>
        </div>
      </ScreenContainer>
    )
  }

  const renderScreen3 = () => {
    return (
      <ScreenContainer>
        <ScreenHeader
          title={t("create-new-pass-title")}
          description="Please choose a new password."
        />
        <Input
          placeholder="New Password"
          type={isPasswordVisible ? "text" : "password"}
          value={formData.password}
          onChange={handleChange("password")}
          leftIcon={<LockIcon />}
          rightIcon={isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          onRightIconClick={toggleFields("password")}
          customClassName="min-w-[500px]"
        />
        <Input
          placeholder="Confirm New Password"
          type={isPasswordVisible ? "text" : "password"}
          value={formData.resetPassword}
          onChange={handleChange("resetPassword")}
          leftIcon={<LockIcon />}
          rightIcon={isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          onRightIconClick={toggleFields("password")}
          customClassName="min-w-[500px]"
        />
        <Button
          text={t("create-pass-btn")}
          type="primary"
          onClick={() => alert("complete!")}
          customClassName="text-2xl custom-red-button w-1/2 mt-4"
        />
        <Button
          text={t("back-button")}
          type="secondary"
          onClick={() => setActiveTab("screen2")}
          customClassName="text-lg custom-red-button"
        />
      </ScreenContainer>
    );
  }

  //! should i keep the 'back' buttons?
  const renderPages = () => {
    switch (activeTab) {
      case "screen1":
        return renderScreen1();
      case "screen2":
        return renderScreen2();
      case "screen3":
        return renderScreen3();
      default:
        return renderScreen1();
    }
  }

  return (
    <>
      {renderPages()}
    </>
  );
};

export default ResetPassword;
