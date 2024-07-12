interface HistoryItemProps {
  date: string;
  typeOfEmergency: string;
  location: string;
}

const HistoryItem = ({ date, typeOfEmergency, location }: HistoryItemProps) => {
  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-md">
      <p className="text-lg font-semibold">{date}</p>
      <p className="text-md">{typeOfEmergency}</p>
      <p className="text-sm text-gray-600">{location}</p>
    </div>
  );
};

export default HistoryItem;
