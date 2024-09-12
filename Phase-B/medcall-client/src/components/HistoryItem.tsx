import { useTranslation } from "react-i18next";

interface HistoryItemProps {
  date: string;
  typeOfEmergency: string;
  location: string;
}

const HistoryItem = ({ date, typeOfEmergency, location }: HistoryItemProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row justify-between p-4 bg-white rounded-xl shadow-xl">
      <p className="text-lg md:text-xl font-semibold w-3/5">
        {t("ambulance-location")} {location}
      </p>
      <div className="flex flex-col gap-1">
        <p className="text-base md:text-lg font-semibold">{date}</p>
        <p className="text-md">{typeOfEmergency}</p>
      </div>
    </div>
  );
};

export default HistoryItem;
