import { useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router";
import Button from "../components/Button";
// import Divider from "../components/Divider";
// import GoogleButton from "../components/GoogleButton";
import Input from "../components/Input";

import { ReqeustAmbulanceFormData} from "../interfaces/types";
// import {
//   EyeIcon,
//   EyeOffIcon,
//   LockIcon,
//   MailIcon,
//   PhoneIcon,
//   UserIcon,
// } from "../components/icons";
import Tab from "../components/Tab";
// import { toast } from "react-toastify";
// import { registerUser } from "../services/userService";
// import { handleSignUp } from "../utils/authHandles";

const RequestAmbulance = () => {
  // const navigate = useNavigate();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<"user" | "driver">("user");
  const [activeTab1, setActiveTab1] = useState<"one" | "two">("one");
  const [activeTab2, setActiveTab2] = useState<"one1" | "two1">("one1");
  const [activeTab3, setActiveTab3] = useState<"one1" | "two1">("one1");
  const [activeTab4, setActiveTab4] = useState<"one1" | "two1">("one1");

  const tabs1 = [
    // { title: t("sign-up-tab-1"), key: "user" },
    // { title: t("sign-up-tab-2"), key: "driver" },
    { title: "Accident", key: "user" },
    { title: "Injury", key: "driver" },
    { title: "Fire", key: "else" },
    { title: "Difficulty Breathing", key: "else1" },
    { title: "Severe Bleeding", key: "else2" },
    { title: "Loss of Consciousness", key: "else3" },
  ];
  const tabs2 = [
    { title: "Allergic Reaction", key: "else5" },
    { title: "Heart Attack", key: "else6" },
    { title: "Cardiac Arrest", key: "else7" },
    { title: "Seizure", key: "else8" },
    { title: "Overdose or Poisoning", key: "else9" },
    { title: "Other", key: "else10" },
  ];

  const tabs3 = [
    {title: "Conscious", key: "one"},
    {title: "Unconscious", key: "two"},
    {title: "Unsure", key: "three"},
  ]
  const tabs4 = [
    {title: "Breathing Normally", key: "one1"},
    {title: "Difficulty Breathing", key: "two1"},
    {title: "Not Breathing", key: "two2"},
    {title: "Unsure", key: "three3"},
  ]
  const tabs5 = [
    {title: "Not Bleeding", key: "one1"},
    {title: "Minor Bleeding", key: "two1"},
    {title: "Severe Bleeding", key: "two2"},
    {title: "Unsure", key: "three3"},
  ]
  const tabs6 = [
    {title: "Mild", key: "one1"},
    {title: "Moderate", key: "two1"},
    {title: "Severe", key: "two2"},
    {title: "Unsure", key: "three3"},
  ]

  const [formData, setFormData] = useState<ReqeustAmbulanceFormData>({
    name: "",
    phoneNumber: "",
    patientAge: "",
  });

  const handleChange =
    (field: keyof ReqeustAmbulanceFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: (e.target as HTMLInputElement).value,
      }));
    };

  // Leen
  // const handleSignUpClick = async () => {
  //   const status = await handleSignUp(formData, activeTab);
  //   if (status) navigate("/dashboard");
  // };
  
return (
    <>
      <section className="py-10 flex justify-center items-center">
        <div className="box-modal shadow-2xl">
        <h2 class="text-4xl font-bold text-center mb-2">Necessary Information</h2>
        <p class="text-center mb-4">
        Please provide the following information to request emergency medical assistance.
        </p>
          <div className={"font-bold justify-start text-xl"}>Caller's Contact Information:</div>
          <div className={"flex flex-row gap-4 justify-between w-full"}>
                <Input
                  type="text"
                  // placeholder={t("sign-up-first-name-placeholder")}
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange("name")}
                />
                <Input
                  type="text"
                placeholder={t("sign-up-phone-placeholder")}
                value={formData.phoneNumber}
                onChange={handleChange("phoneNumber")}
                />
              </div>
              <div className={"flex mb-2 justify-start"}>
                <div className={"font-bold"}>Patient's Age:</div>
                <Input
                  type="text"
                  placeholder="Age"
                  value={formData.patientAge}
                  onChange={handleChange("patientAge")}
                />
              </div>

          {/* buttons here ! */}
          <div className="font-bold text-xl">Type of emergency (Select one):
            <div className={"py-2 flex gap-3"}>{tabs1.map((tab) => (
              <Tab
                key={tab.key}
                title={tab.title}
                active={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key as "user")}
              />
            ))}</div>
             <div className={"py-2 flex gap-3"}>{tabs2.map((tab) => (
              <Tab
                key={tab.key}
                title={tab.title}
                active={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key as "user")}
              />
            ))}</div>
          </div>

          <div className="font-bold text-xl">Patient's Consciousness (Select one):
            <div className={"py-2 flex gap-3"}>{tabs3.map((tab) => (
              <Tab
                key={tab.key}
                title={tab.title}
                active={activeTab1 === tab.key}
                onClick={() => setActiveTab1(tab.key as "one")}
              />
            ))}</div>
          </div>

          <div className="font-bold text-xl">Breathing Status (Select one):
            <div className={"py-2 flex gap-3"}>{tabs4.map((tab) => (
              <Tab
                key={tab.key}
                title={tab.title}
                active={activeTab2 === tab.key}
                onClick={() => setActiveTab2(tab.key as "one1")}
              />
            ))}</div>
          </div>

          <div className="font-bold text-xl">Bleeding (Select one):
            <div className={"py-2 flex gap-3"}>{tabs5.map((tab) => (
              <Tab
                key={tab.key}
                title={tab.title}
                active={activeTab3 === tab.key}
                onClick={() => setActiveTab3(tab.key as "one1")}
              />
            ))}</div>
          </div>

          <div className="font-bold text-xl">Pain Level (Select one):
            <div className={"py-2 flex gap-3"}>{tabs6.map((tab) => (
              <Tab
                key={tab.key}
                title={tab.title}
                active={activeTab4 === tab.key}
                onClick={() => setActiveTab4(tab.key as "one1")}
              />
            ))}</div>
          </div>

          <div className={"flex flex-col gap-2 justify-center w-auto"}>
            <Button
              text="Request Ambulance"
              type="primary"
              onClick={() => {}}
              customClassName={"font-bold text-3xl"}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default RequestAmbulance;
