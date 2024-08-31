import { useTranslation } from "react-i18next";

const HowItWork = () => {
  const { t } = useTranslation();

  const renderStep = (step: string, title: string, content: string) => {
    return (
      <div className="flex flex-col justify-center text-start gap-6 bg-modalBackground rounded-2xl p-8 shadow-xl h-[300px]">
        <h2 className="text-lg text-grey m-0">{step}</h2>
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
          <p className="text-lg md:text-xl">{content}</p>
        </div>
      </div>
    );
  };

  const steps = [1, 2, 3];

  return (
    <section className="flex flex-col gap-6 md:gap-8 items-center pb-20 px-6">
      <h2 className="text-2xl md:text-3xl font-bold">
        {t("how-it-work-title")}
      </h2>
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full justify-between items-stretch">
        {steps.map((index) => (
          <div key={index} className={"w-full md:w-1/3"}>
            {renderStep(
              t(`how-it-work-step-${index}`),
              t(`how-it-work-step-${index}-title`),
              t(`how-it-work-step-${index}-content`)
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWork;
