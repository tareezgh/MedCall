import { useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import Divider from "../components/Divider";
import GoogleButton from "../components/GoogleButton";
import Input from "../components/Input";

import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "../components/icons";
import { SignInFormData } from "../interfaces/types";
import { handleSignIn } from "../utils/authHandles";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange =
    (field: keyof SignInFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleForgetPassword = () => {};

  const handleSignInClick = async () => {
    const status = await handleSignIn(formData);
    if (status) navigate("/dashboard");
  };

  const handleGoogleSignIn = () => {};

  return (
    <>
      <section className="h-screen flex justify-center items-center">
        <div className="box-modal shadow-2xl">
          <h2 className="text-4xl font-Pippins font-semibold m-0">
            {t("login-form-title")}
          </h2>
          <div className={"flex flex-col gap-4 w-full"}>
            <div className={"flex flex-col gap-8 w-full"}>
              <Input
                type="text"
                placeholder={t("login-email-placeholder")}
                value={formData.email}
                onChange={handleChange("email")}
                leftIcon={<MailIcon />}
                customClassName="min-w-[500px]"
              />
              <Input
                placeholder={t("login-password-placeholder")}
                type={isPasswordVisible ? "text" : "password"}
                value={formData.password}
                onChange={handleChange("password")}
                leftIcon={<LockIcon />}
                rightIcon={isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                onRightIconClick={toggleFields("password")}
                customClassName="min-w-[500px]"
              />
            </div>
            <div className={"flex flex-row justify-between w-full text-base"}>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={toggleFields("rememberMe")}
                  className="mr-2 checked:bg-secondary500 "
                />
                {t("login-remember-me")}
              </label>

              <div
                className="flex items-center justify-center cursor-pointer"
                onClick={handleForgetPassword}
              >
                {t("login-forget-password")}
              </div>
            </div>
          </div>
          <div className={"flex flex-col gap-2 justify-center w-auto"}>
            <Button
              text={t("login-form-button")}
              type="primary"
              onClick={handleSignInClick}
              customClassName={"font-bold text-2xl"}
            />
            <div className="text-base">
              <h2>
                {t("login-nav-to")}
                <span
                  className={"text-primary500 font-bold cursor-pointer"}
                  onClick={() => navigate("/sign-up")}
                >
                  {t("login-nav-to-text")}
                </span>
              </h2>
            </div>
          </div>
          <div className={"flex flex-col gap-6 w-full"}>
            <Divider />
            <GoogleButton
              text="Sign in with Google"
              onClick={handleGoogleSignIn}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;