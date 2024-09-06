import { useTranslation } from "react-i18next";
import pinDriver from "../assets/pinDriver.svg";
import pinUser from "../assets/pinUser.svg";
import { useSelector } from "react-redux";
interface LocationItemProps {
  type: "userLocation" | "driverLocation";
  location: string;
}

const LocationItem = ({ type, location }: LocationItemProps) => {
  const { t } = useTranslation();
  const currentUser = useSelector((state: any) => state.currentUser);

  const locationLabel = () => {
    if (type === "driverLocation") {
      return currentUser.role === "driver" ? t("your-location") : t("driver-location");
    } else {
      return currentUser.role === "driver" ? t("caller-location") : t("your-location");
    }
  };
  
  return (
    <div className="flex items-center gap-2 justify-between p-4 bg-white rounded-lg shadow-lg hover:bg-gray-100 w-full">
      {type === "driverLocation" ? (
        <img src={pinDriver} alt="icon" />
      ) : (
        <img src={pinUser} alt="icon" />
      )}

      <h3 className="text-sm font-semibold text-secondary500">
        {location ? `${locationLabel()}: ${location}` : "location"}
      </h3>
    </div>
  );
};

export default LocationItem;
