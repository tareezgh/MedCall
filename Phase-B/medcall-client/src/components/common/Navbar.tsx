import { useEffect, useState } from "preact/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Button from "../Button";
import logo from "../../assets/logo-img.webp";
import { GlobeIcon, NotificationIcon, UserIcon } from "../icons";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const currentUser = useSelector((state: any) => state.currentUser);
  const [navbarMargin, setNavbarMargin] = useState("ml-64");
  const [showLanguage, setShowLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("selectedLanguage") || "en"
  );
  // console.log("🚀 ~ Navbar ~ currentUser:", currentUser);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setNavbarMargin(getMargin(selectedLanguage));
    } else {
      setNavbarMargin("w-full");
    }
  }, [location.pathname, selectedLanguage]);

  const getMargin = (language: string) => {
    return language === "ar" || language === "he" ? "mr-64" : "ml-64";
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = (e.target as HTMLSelectElement).value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("selectedLanguage", newLanguage);
    if (newLanguage === "ar" || newLanguage === "he") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", newLanguage);
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", "en");
    }
  };

  const renderLanguageIcon = () => {
    return (
      <div className="relative flex justify-center items-center content-center">
        <GlobeIcon onClick={() => setShowLanguage(!showLanguage)} />

        {showLanguage && (
          <select
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="en">En</option>
            <option value="ar">Ar</option>
            <option value="he">He</option>
          </select>
        )}
      </div>
    );
  };

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
          {renderLanguageIcon()}
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
        className={`flex flex-row items-center justify-between h-20  p-6 border-b custom-border shadow ${navbarMargin} `}
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

        <div className="buttons-side flex flex-row justify-center items-center gap-3">
          <NotificationIcon onClick={() => {}} />
          {renderLanguageIcon()}
        </div>
      </nav>
    );
  };

  return <>{currentUser.id ? renderLoggedInNavbar() : renderRegularNavbar()}</>;
};

export default Navbar;
