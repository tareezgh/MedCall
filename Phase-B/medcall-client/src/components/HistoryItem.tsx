interface HistoryItemProps {
  date: string;
  typeOfEmergency: string;
  location: string;
}

const HistoryItem = ({ date, typeOfEmergency, location }: HistoryItemProps) => {
  return (
    <div className="flex flex-row justify-between p-4 bg-white rounded-xl shadow-xl">
      <p className="text-xl font-semibold w-3/5">
        Ambulance Request in {location}
      </p>
      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold">{date}</p>
        <p className="text-md">{typeOfEmergency}</p>
      </div>
    </div>
  );
};

export default HistoryItem;
