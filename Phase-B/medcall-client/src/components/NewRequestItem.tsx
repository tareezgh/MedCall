import { AddressIcon } from "../components/icons";

interface NewRequestItemProps {
  typeOfEmergency: string;
  location: string;
  onClick: () => void;
}

const NewRequestItem = ({ typeOfEmergency, location, onClick }: NewRequestItemProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 w-full"

    >
      <div className="flex items-center gap-2">
        <div className="bg-slate-300 py-1 px-1 rounded-2xl">
          <AddressIcon
            width={20}
            height={20} />
        </div>
        <h3 className="text-sm font-semibold text-secondary500">{location ? location : "temp_location"}</h3>
      </div>
      <div className="flex gap-2">
        <span className="text-sm px-3 py-1 rounded-full bg-secondary500 text-white">
          {typeOfEmergency}
        </span>
        {/* Add condition for "Urgent" tag if necessary */}
        {typeOfEmergency.toLowerCase() === "fire" && (
          <span className="text-sm px-3 py-1 rounded-full bg-red-600 text-white">
            Urgent
          </span>
        )}
      </div>
    </button>
  );
};

export default NewRequestItem;
