import Button from "../components/Button";
import Input from "../components/Input";
import { LocationIcon } from "../components/icons";

import heroImg from "../assets/hero-image.webp";
import { useTranslation } from "react-i18next";
import { useState } from "preact/hooks";
import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [location, setLocation] = useState("");

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation((e.target as HTMLInputElement).value);
  };

  const handleNewRequestClick = () => {
    navigate("/request-ambulance")
  };

  const handleRightIconClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // TODO make readable address by google
          setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
        },
        (error) => {
          console.error("Error obtaining location", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };
  return (
    <section className="flex justify-center items-center gap-20 my-20">
      <div className="flex justify-center text-start inset-0 flex-col gap-8 bg-modalBackground rounded-2xl w-fit h-fit min-h-[350px] p-12 shadow-xl">
        <h2 className="text-3xl font-bold">{t("hero-title")}</h2>
        <div className="flex flex-col gap-4">
          <h5 className="text-xl">{t("hero-subtitle")}</h5>
          <Input
            type="text"
            placeholder={t("hero-placeholder")}
            value={location}
            onChange={handleLocationChange}
            rightIcon={<LocationIcon />}
            onRightIconClick={handleRightIconClick}
          />
        </div>
        <Button
          text={t("hero-button")}
          type="primary"
          onClick={handleNewRequestClick}
          customClassName="text-2xl font-bold"
        />
      </div>
      <img src={heroImg} alt="hero-image" width={500} height={500} />
    </section>
  );
};

export default Hero;
