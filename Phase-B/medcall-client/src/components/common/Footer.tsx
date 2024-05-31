import { useTranslation } from "react-i18next";
import logo from "../../assets/logo-img.webp";

import mailIcon from "../../assets/icons/mail.svg";
import phoneIcon from "../../assets/icons/phone.svg";
import addressIcon from "../../assets/icons/address.svg";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const renderItem = (icon: string, text: string) => {
    return (
      <div className="flex items-center text-center gap-2">
        <div className="rounded-full bg-lightBg p-2">
          <img src={icon} alt="icon" className="h-6 w-6" />
        </div>
        <span className="text-xl">{text}</span>
      </div>
    );
  };
  return (
    <>
      <footer className="flex flex-row justify-between items-center text-start p-8 border-t custom-border shadow">
        <div className="flex flex-col gap-4 w-1/2 items-start">
          <div>
            <div
              className="hover:cursor-pointer"
              onClick={() => {
                navigate("/");
                window.scroll(0, 0);
              }}
            >
              <img src={logo} alt={"MedCall Logo"} className="h-[3.5rem]" />
            </div>

            <div className="text-xl">{`${t(
              "footer-copyright"
            )}${currentYear}`}</div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold italic">{t("footer-title")}</h2>
            <p className="text-lg">{t("footer-paragraph")}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {renderItem(mailIcon, t("footer-email"))}
          {renderItem(phoneIcon, t("footer-phone"))}
          {renderItem(addressIcon, t("footer-address"))}
        </div>
      </footer>
    </>
  );
};

export default Footer;
