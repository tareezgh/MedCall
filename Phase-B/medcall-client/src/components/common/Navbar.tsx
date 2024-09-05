import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Button from "../Button";
import logo from "../../assets/logo-img.webp";
import { GlobeIcon, XIcon, MenuIcon, UserIcon } from "../icons";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const currentUser = useSelector((state: any) => state.currentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarMargin, setNavbarMargin] = useState("ml-64");
  const [showLanguage, setShowLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("selectedLanguage") || "en"
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  console.log("🚀 ~ Navbar ~ currentUser:", currentUser);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false); // Close the mobile menu when switching to desktop view
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      setNavbarMargin(getMargin(selectedLanguage));
    } else {
      setNavbarMargin("w-full");
    }
  }, [window.location.pathname, selectedLanguage]);

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

  const renderLogoSection = () => (
    <div
      className="logo-side hover:cursor-pointer"
      onClick={() => route("/")}
    >
      <img src={logo} alt="MedCall Logo" className="h-[3rem] md:h-[3.5rem]" />
    </div>
  );

  const renderMenuToggle = () => (
    <div className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
      {isMenuOpen ? <XIcon /> : <MenuIcon />}
    </div>
  );

  const renderDesktopNavItems = () => (
    <div className="buttons-side flex flex-row gap-3 md:flex sm:hidden">
      {renderLanguageIcon()}
      <Button
        text={t("navbar-login-button")}
        type="secondary"
        onClick={() => route("/login")}
      />
      <Button
        text={t("navbar-sign-up-button")}
        type="primary"
        onClick={() => route("/sign-up")}
      />
    </div>
  );

  const renderMobileMenu = () =>
    isMenuOpen && (
      <div className="absolute top-[5rem] left-0 right-0 bg-white shadow-md flex flex-col gap-4 items-center p-8 z-[100] md:hidden">
        <Button
          text={t("navbar-login-button")}
          type="secondary"
          onClick={() => {
            route("/login");
            setIsMenuOpen(false);
          }}
          customClassName="w-full mb-2"
        />
        <Button
          text={t("navbar-sign-up-button")}
          type="primary"
          onClick={() => {
            route("/sign-up");
            setIsMenuOpen(false);
          }}
          customClassName="w-full"
        />
        {renderLanguageIcon()}
      </div>
    );

  const renderRegularNavbar = () => {
    return (
      <nav className="flex flex-row items-center justify-between h-20 p-6 border-b custom-border shadow">
        {renderLogoSection()}
        {renderMenuToggle()}
        {isMobile ? renderMobileMenu() : renderDesktopNavItems()}
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
            onClick={() => route("/dashboard")}
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
          {renderLanguageIcon()}
        </div>
      </nav>
    );
  };

  return <>{currentUser.id ? renderLoggedInNavbar() : renderRegularNavbar()}</>;
};

export default Navbar;
