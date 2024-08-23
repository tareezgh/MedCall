import pinDriver from "../assets/pinDriver.svg";
import pinUser from "../assets/pinUser.svg";
interface LocationItemProps {
  type: "userLocation" | "driverLocation";
  location: string;
}

const LocationItem = ({ type, location }: LocationItemProps) => {
  return (
    <div className="flex items-center gap-2 justify-between p-4 bg-white rounded-lg shadow-lg hover:bg-gray-100 w-full">
      {type === "driverLocation" ? (
        <img src={pinUser} alt="icon" />
      ) : (
        <img src={pinDriver} alt="icon" />
      )}

      <h3 className="text-sm font-semibold text-secondary500">
        {location ? location : "temp_location"}
      </h3>
    </div>
  );
};

export default LocationItem;
