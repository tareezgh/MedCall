import { useEffect, useState } from "preact/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Button from "../Button";
import logo from "../../assets/logo-img.webp";
import { NotificationIcon, UserIcon } from "../icons";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const currentUser = useSelector((state: any) => state.currentUser);
  const [navbarWidth, setNavbarWidth] = useState("w-5/6 ml-[16.666667%]");
  console.log("🚀 ~ Navbar ~ currentUser:", currentUser)

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setNavbarWidth("w-5/6 ml-[16.666667%]");
    } else {
      setNavbarWidth("w-full");
    }
  }, [location.pathname]);

  const renderRegularNavbar = () => {
    return (
      <nav className="flex flex-row items-center justify-between h-20 p-6 border-b custom-border shadow">
        <div
          className="logo-side hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
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
    );
  };

  const renderLoggedInNavbar = () => {
    return (
      <nav
        className={`flex flex-row items-center justify-between  h-20  p-6 border-b custom-border shadow ${navbarWidth} `}
      >
        <div className="flex flex-row gap-4">
          <div
            className="profile-picture rounded-full bg-lightBg px-3 py-3 hover:cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <UserIcon />
          </div>
          <div className="flex flex-col items-start text-base">
            <h2>
              {currentUser.firstName} {currentUser.lastName}
            </h2>
            <h2>{currentUser.email}</h2>
          </div>
        </div>

        <div className="buttons-side flex flex-row gap-3">
          <NotificationIcon onClick={() => {}} />
          {/* //TODO add language icon */}
        </div>
      </nav>
    );
  };

  return <>{currentUser.id ? renderLoggedInNavbar() : renderRegularNavbar()}</>;
};

export default Navbar;
