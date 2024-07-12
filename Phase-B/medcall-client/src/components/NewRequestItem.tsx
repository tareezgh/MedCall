interface NewRequestItemProps {
  typeOfEmergency: string;
  location: string;
  onClick: () => void;
}

const NewRequestItem = ({ typeOfEmergency, location ,onClick}: NewRequestItemProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col p-4 bg-white rounded-lg shadow-md hover:bg-gray-200"
    >
      <h3 className="text-lg font-semibold">{location}</h3>
      <p className="text-sm">{typeOfEmergency}</p>

    </button>
  );
};

export default NewRequestItem;
