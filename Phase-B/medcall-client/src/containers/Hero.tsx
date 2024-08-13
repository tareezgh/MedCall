import Button from "../components/Button";
import Input from "../components/Input";
import { LocationIcon } from "../components/icons";

import heroImg from "../assets/hero-image.webp";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "preact/hooks";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLocationCoords } from "../redux/Slicers";
import { Autocomplete, LoadScript } from "@react-google-maps/api";

import { handleGetLocation } from "../utils/geolocationUtils";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation((e.target as HTMLInputElement).value);
  };

  const handleNewRequestClick = () => {
    navigate("/request-ambulance");
  };

  const handleRightIconClick = async () => {
    const address = await handleGetLocation();
    if (address) {
      setLocation(address);
    }
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place) {
        const formattedAddress = place.formatted_address || "";
        console.log(
          "🚀 ~ handlePlaceChanged ~ formattedAddress:",
          formattedAddress
        );
        setLocation(formattedAddress);

        if (place.geometry && place.geometry.location) {
          const latitude = place.geometry.location.lat();
          console.log("🚀 ~ handlePlaceChanged ~ latitude:", latitude);
          const longitude = place.geometry.location.lng();
          console.log("🚀 ~ handlePlaceChanged ~ longitude:", longitude);
          dispatch(
            setLocationCoords({
              latitude,
              longitude,
              address: formattedAddress,
            })
          );
        }
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
      <section className="flex justify-center items-center gap-20 my-20">
        <div className="flex justify-center text-start inset-0 flex-col gap-8 bg-modalBackground rounded-2xl w-fit h-fit min-h-[350px] p-12 shadow-xl">
          <h2 className="text-3xl font-bold">{t("hero-title")}</h2>
          <div className="flex flex-col gap-4">
            <h5 className="text-xl">{t("hero-subtitle")}</h5>
            <Autocomplete
              onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              }
              onPlaceChanged={handlePlaceChanged}
              options={{ types: ["address"] }}
            >
              <Input
                type="text"
                placeholder={t("hero-placeholder")}
                value={location}
                onChange={handleLocationChange}
                rightIcon={<LocationIcon />}
                onRightIconClick={handleRightIconClick}
                customClassName="text-xl"
              />
            </Autocomplete>
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
    </LoadScript>
  );
};

export default Hero;
