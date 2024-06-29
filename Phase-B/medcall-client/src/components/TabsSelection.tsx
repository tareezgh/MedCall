import { useTranslation } from "react-i18next";
import Tab from "./Tab";

interface TabsSelectionProps {
  title: string;
  tabs: { title: string; key: string }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  prefix: string;
  customClassName?: string;
}

const TabsSelection = ({
  title,
  tabs,
  activeTab,
  setActiveTab,
  prefix,
  customClassName,
}: TabsSelectionProps) => {
  const { t } = useTranslation();
  const translatedTabs = tabs.map((tab) => ({
    ...tab,
    title: t(`${prefix}-${tab.key}`),
  }));
  return (
    <>
      <h2 className="font-bold text-xl">{title}</h2>
      <div className={`flex gap-3 py-2 ${customClassName}`}>
        {translatedTabs.map((tab) => (
          <Tab
            key={tab.key}
            title={tab.title}
            type="secondary"
            active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          />
        ))}
      </div>
    </>
  );
};

export default TabsSelection;
