import { useState } from "preact/hooks";
import { ReactNode } from "preact/compat";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Input from "../components/Input";
import OTPInput from "../components/OTPInput";
import { ResetPasswordFormData } from "../interfaces/types";
import { MailIcon, EyeIcon, EyeOffIcon, LockIcon } from "../components/icons";
import { resetPassword, sendOtp, verifyOtp } from "../services/userService";
import { route } from "preact-router";
import Navbar from "../components/common/Navbar";

type ScreenContainerProps = {
  children: ReactNode;
};

type ScreenHeaderProps = {
  title: string;
  description: ReactNode | string;
};

const ScreenContainer = ({ children }: ScreenContainerProps) => (
  <section className="flex justify-center items-center h-full my-12 py-10 px-6">
    <div className="flex flex-col justify-center items-center text-center gap-6 p-4 md:p-6 bg-modalBackground rounded-2xl min-w-fit min-h-fit shadow-xl">
      {children}
    </div>
  </section>
);

const ScreenHeader = ({ title, description }: ScreenHeaderProps) => (
  <div className="flex flex-col justify-center items-center gap-2">
    <h2 className="text-3xl font-bold py-2">{title}</h2>
    <h5 className="py-2">{description}</h5>
  </div>
);

const ResetPassword = () => {
  const { t } = useTranslation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [activeTab, setActiveTab] = useState("main");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange =
    (field: keyof ResetPasswordFormData) =>
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

  const handleEmailSubmit = async () => {
    if (formData.email.trim() === "") {
      toast.error(t("error-email-required"), {
        position: "top-center",
        hideProgressBar: true,
      });

      return;
    }
    try {
      await sendOtp(formData.email);
      setActiveTab("otp");
    } catch (error) {
      toast.error(t("error-sending-otp"), {
        position: "top-center",
        hideProgressBar: true,
      });
    }
  };

  const handleOTPSubmit = async () => {
    const otpFieldsFilled = otp.every((value) => value.trim() !== "");
    if (!otpFieldsFilled) {
      toast.error(t("error-otp-required"), {
        position: "top-center",
        hideProgressBar: true,
      });

      return;
    }

    try {
      const otpCode = otp.join("");
      const isOtpVerified = await verifyOtp(formData.email, otpCode);

      if (isOtpVerified) {
        setActiveTab("reset");
      } else {
        toast.error(t("error-otp-invalid"), {
          position: "top-center",
          hideProgressBar: true,
        });
      }
    } catch (error) {
      toast.error(t("error-verifying-otp"), {
        position: "top-center",
        hideProgressBar: true,
      });
    }
  };

  const handleResetSubmit = async () => {
    if (
      formData.password.trim() === "" ||
      formData.confirmPassword.trim() === ""
    ) {
      toast.error(t("error-password-required"), {
        position: "top-center",
        hideProgressBar: true,
      });

      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error(t("error-password-mismatch"), {
        position: "top-center",
        hideProgressBar: true,
      });
      return;
    }

    try {
      await resetPassword(formData.email, formData.password);
      toast.success(t("password-reset-success"), {
        position: "top-center",
        hideProgressBar: true,
      });
      route("/login");
    } catch (error) {
      toast.error(t("error-resetting-password"), {
        position: "top-center",
        hideProgressBar: true,
      });
    }
  };

  const renderMainScreen = () => {
    return (
      <ScreenContainer>
        <ScreenHeader
          title={t("reset-pass-title")}
          description={t("reset-pass-subtitle")}
        />
        <Input
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange("email")}
          leftIcon={<MailIcon />}
        />
        <Button
          text={t("reset-pass-button")}
          type="primary"
          onClick={handleEmailSubmit}
          customClassName="text-2xl"
        />
      </ScreenContainer>
    );
  };

  const renderOtpScreen = () => {
    return (
      <ScreenContainer>
        <ScreenHeader
          title={t("reset-pass-otp-title")}
          description={
            <>
              {t("reset-pass-otp-subtitle1")}{" "}
              <span className="font-bold">{formData.email}</span>.{" "}
              {t("reset-pass-otp-subtitle2")}
            </>
          }
        />
        <OTPInput otp={otp} setOtp={setOtp} />
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4">
            <Button
              text={t("back-button")}
              type="secondary"
              onClick={() => setActiveTab("main")}
              customClassName="text-lg"
            />
            <Button
              text={t("reset-pass-verify")}
              type="primary"
              onClick={handleOTPSubmit}
              customClassName="text-2xl"
            />
          </div>
          <div className="text-base">
            <h2>
              {t("reset-pass-no-code")}
              <span
                className="text-primary500 font-bold cursor-pointer"
                onClick={() => {}}
              >
                {t("reset-pass-send-again")}
              </span>
            </h2>
          </div>
        </div>
      </ScreenContainer>
    );
  };

  const renderResetScreen = () => {
    return (
      <ScreenContainer>
        <ScreenHeader
          title={t("reset-pass-create-title")}
          description={t("reset-pass-create-subtitle")}
        />
        <Input
          placeholder={t("reset-pass-create-placeholder1")}
          type={isPasswordVisible ? "text" : "password"}
          value={formData.password}
          onChange={handleChange("password")}
          leftIcon={<LockIcon />}
          rightIcon={isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          onRightIconClick={toggleVisibility("password")}
          customClassName="md:min-w-[500px]"
        />
        <Input
          placeholder={t("reset-pass-create-placeholder2")}
          type={isConfirmPasswordVisible ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          leftIcon={<LockIcon />}
          rightIcon={isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          onRightIconClick={toggleVisibility("confirmPassword")}
          customClassName="md:min-w-[500px]"
        />
        <div className="flex flex-row gap-4 w-full justify-center">
          <Button
            text={t("back-button")}
            type="secondary"
            onClick={() => setActiveTab("otp")}
            customClassName="text-lg "
          />
          <Button
            text={t("reset-pass-create-btn")}
            type="primary"
            onClick={handleResetSubmit}
            customClassName="text-2xl "
          />
        </div>
      </ScreenContainer>
    );
  };

  const renderPages = () => {
    switch (activeTab) {
      case "main":
        return renderMainScreen();
      case "otp":
        return renderOtpScreen();
      case "reset":
        return renderResetScreen();
      default:
        return renderMainScreen();
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      {renderPages()}
    </div>
  );
};

export default ResetPassword;
