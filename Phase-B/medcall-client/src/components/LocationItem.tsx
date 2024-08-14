import { AddressIcon } from "./icons";

interface LocationItemProps {
  type: "userLocation" | "driverLocation";
  location: string;
}

const LocationItem = ({ type, location }: LocationItemProps) => {
  return (
    <div className="flex items-center gap-2 justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 w-full">
      <div className="bg-slate-300 py-1 px-1 rounded-2xl">
        <AddressIcon width={20} height={20} />
      </div>
      <h3 className="text-sm font-semibold text-secondary500">
        {location ? location : "temp_location"}
      </h3>
    </div>
  );
};

export default LocationItem;
