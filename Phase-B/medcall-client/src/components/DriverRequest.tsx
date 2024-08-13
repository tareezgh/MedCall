// import React from 'react';
import DriversTable from "./DriversTable";
import { useTranslation } from "react-i18next";

const DriverRequest = () => {
  // mock data
  const drivers = [
    { fullName: 'Avraham Levy', phone: '052-123-4567', email: 'avraham.levy@gmail.com', city: 'Tel Aviv' },
    { fullName: 'Yael Cohen', phone: '054-987-6543', email: 'yael.cohen@gmail.com', city: 'Jerusalem' },
  ];
  const { t } = useTranslation();

  return (
    <>
      <div className="mt-4 left-side flex flex-col gap-4">
        <h1 className="text-4xl w-full text-start text-black">
         {t("drivers-requests-title")}
        </h1>
        <div className="flex justify-start items-center text-center flex-col gap-6 p-6 bg-white rounded-2xl w-full h-fit shadow-xl">
          <DriversTable drivers={drivers} type={"request"} />
        </div>
      </div>
    </>
  );
};

export default DriverRequest;
