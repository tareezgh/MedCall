import { useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";
import TabsSelection from "../components/TabsSelection";

import {
  emergencyTypeTabs,
  consciousnessTabs,
  breathingStatusTabs,
  bleedingTabs,
  painLevelTabs,
} from "../data/requestData";
import {
  AmbulanceRequest,
  RequestAmbulanceFormData,
} from "../interfaces/types";

const RequestAmbulance = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isOptionalSection, setIsOptionalSection] = useState<boolean>(false);

  const [formData, setFormData] = useState<RequestAmbulanceFormData>({
    callerName: "",
    phoneNumber: "",
    patientAge: "",
    optionalAllergies: "",
    optionalMedications: "",
    optionalActivities: "",
  });

  const [tabsState, setTabsState] = useState({
    emergencyType: "accident",
    consciousness: "conscious",
    breathingStatus: "breathing_normally",
    bleeding: "not_bleeding",
    painLevel: "mild",
  });

  const handleChange =
    (field: keyof RequestAmbulanceFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: (e.target as HTMLInputElement).value,
      }));
    };

  const handleTabChange = (tabField: string, value: string) => {
    setTabsState((prevState) => ({
      ...prevState,
      [tabField]: value,
    }));
  };
  const renderTitles = (title: string, subtitle: string) => {
    return (
      <>
        <div className="flex flex-col gap-3 mb-4">
          <h2 className="text-4xl font-bold">{title}</h2>
          <h4 className="text-xl">{subtitle}</h4>
        </div>
      </>
    );
  };

  const handleNecessaryInfoSubmit = () => {
    console.log("Form submitted with data:", formData);
    setIsOptionalSection(true);
  };

  const handleRequestAmbulance = () => {
    console.log("🚀 ~ handleRequestAmbulance:");
    const newRequestData: AmbulanceRequest = {
      userId: "",
      callerName: formData.callerName,
      phoneNumber: formData.phoneNumber,
      patientAge: parseInt(formData.patientAge),
      emergencyType: tabsState.emergencyType,
      consciousness: tabsState.consciousness,
      breathingStatus: tabsState.breathingStatus,
      bleeding: tabsState.bleeding,
      painLevel: tabsState.painLevel,
      optionalAllergies: formData.optionalAllergies,
      optionalMedications: formData.optionalMedications,
      optionalActivities: formData.optionalActivities,
    };
    console.log("🚀 ~ newRequestData:", newRequestData);
    navigate("/dashboard");
  };

  const renderNecessaryInfo = () => {
    return (
      <>
        {renderTitles(t("new-request-title"), t("new-request-subtitle"))}

        <div className="flex flex-col gap-4 justify-start items-start">
          <div className="flex flex-col gap-4 justify-between items-start w-full">
            <h2 className="font-bold text-xl">
              {t("caller-contact-info-title")}
            </h2>
            <div className="flex flex-row gap-4 justify-between w-full">
              <Input
                type="text"
                placeholder={t("name-placeholder")}
                value={formData.callerName}
                onChange={handleChange("callerName")}
              />
              <Input
                type="text"
                placeholder={t("phone-placeholder")}
                value={formData.phoneNumber}
                onChange={handleChange("phoneNumber")}
              />
            </div>
          </div>
          <div className="flex flex-row justify-start items-center">
            <h2 className="font-bold text-xl w-full text-start">
              {t("patient-age-title")}
            </h2>
            <Input
              type="number"
              placeholder={t("age-placeholder")}
              value={formData.patientAge}
              onChange={handleChange("patientAge")}
            />
          </div>
          <TabsSelection
            title={t("emergency-type-title")}
            tabs={emergencyTypeTabs}
            activeTab={tabsState.emergencyType}
            setActiveTab={(value) => handleTabChange("emergencyType", value)}
            prefix="emergency-type"
            customClassName="flex-wrap"
          />
          <TabsSelection
            title={t("consciousness-title")}
            tabs={consciousnessTabs}
            activeTab={tabsState.consciousness}
            setActiveTab={(value) => handleTabChange("consciousness", value)}
            prefix="consciousness"
          />
          <TabsSelection
            title={t("breathing-status-title")}
            tabs={breathingStatusTabs}
            activeTab={tabsState.breathingStatus}
            setActiveTab={(value) => handleTabChange("breathingStatus", value)}
            prefix="breathing-status"
          />
          <TabsSelection
            title={t("bleeding-title")}
            tabs={bleedingTabs}
            activeTab={tabsState.bleeding}
            setActiveTab={(value) => handleTabChange("bleeding", value)}
            prefix="bleeding"
          />
          <TabsSelection
            title={t("pain-level-title")}
            tabs={painLevelTabs}
            activeTab={tabsState.painLevel}
            setActiveTab={(value) => handleTabChange("painLevel", value)}
            prefix="pain-level"
          />
        </div>
      </>
    );
  };

  const renderOptionalInfo = () => {
    return (
      <>
        {renderTitles(t("optional-info-title"), t("optional-info-subtitle"))}

        <div className="flex flex-col gap-4 justify-start items-start w-full">
          <div className="flex flex-col gap-4 justify-start items-start w-full">
            <h2 className="font-bold text-xl">
              {t("optional-info-allergies")}
            </h2>
            <div className="flex flex-row gap-4 justify-start w-full">
              <Input
                type="text"
                placeholder={t("optional-info-allergies-placeholder")}
                value={formData.optionalAllergies}
                onChange={handleChange("optionalAllergies")}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-start items-start w-full">
            <h2 className="font-bold text-xl">
              {t("optional-info-medications")}
            </h2>
            <div className="flex flex-row gap-4 justify-start w-full">
              <Input
                type="text"
                placeholder={t("optional-info-medications-placeholder")}
                value={formData.optionalMedications}
                onChange={handleChange("optionalMedications")}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-start items-start w-full">
            <h2 className="font-bold text-xl">
              {t("optional-info-activities")}
            </h2>
            <div className="flex flex-row gap-4 justify-start w-full">
              <Input
                type="text"
                placeholder={t("optional-info-activities-placeholder")}
                value={formData.optionalActivities}
                onChange={handleChange("optionalActivities")}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <section className="py-10 flex justify-center items-center">
        <div className="box-modal shadow-2x mx-[10%]">
          {isOptionalSection ? renderOptionalInfo() : renderNecessaryInfo()}

          <div className={"flex flex-row gap-2 justify-start w-auto"}>
            {isOptionalSection && (
              <Button
                text={t("back-button")}
                type="secondary"
                onClick={() => setIsOptionalSection(false)}
                customClassName={"text-xl"}
              />
            )}
            <Button
              text={`${
                isOptionalSection
                  ? t("request-ambulance-button")
                  : t("submit-request-button")
              }`}
              type="primary"
              onClick={
                isOptionalSection
                  ? handleRequestAmbulance
                  : handleNecessaryInfoSubmit
              }
              customClassName={"font-semibold text-2xl"}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default RequestAmbulance;
