import { useTranslation } from "react-i18next";

const Divider = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center justify-center">
        <hr className="w-full border-t border-gray-300" />
        <span className="mx-1 w-full opacity-80 text-sm md:text-base">
          {t("form-divider")}
        </span>
        <hr className="w-full border-t border-gray-300" />
      </div>
    </>
  );
};

export default Divider;
