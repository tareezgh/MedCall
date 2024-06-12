import Button from "../Button";
import logo from "../../assets/logo-img.webp";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <nav className="flex flex-row items-center justify-between h-20 p-6 border-b custom-border shadow">
        <div className="logo-side hover:cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt={"MedCall Logo"} className="h-[3.5rem]" />
        </div>

        <div className="buttons-side flex flex-row gap-3">
          <Button
            text={t("navbar-login-button")}
            type="secondary"
            onClick={() => navigate("/login")}
          />
          <Button
            text={t("navbar-sign-up-button")}
            type="primary"
            onClick={() => navigate("/sign-up")}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
