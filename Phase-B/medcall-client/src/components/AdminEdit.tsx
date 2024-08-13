// import React from 'react';
import DriversTable from "./DriversTable";
import Button from "./Button";
import { useTranslation } from "react-i18next";

const adminEdit = () => {
  // mock data
  const drivers = [
    { fullName: 'Avraham Levy', phone: '052-123-4567', email: 'avraham.levy@gmail.com', city: 'Tel Aviv' },
    { fullName: 'Yael Cohen', phone: '054-987-6543', email: 'yael.cohen@gmail.com', city: 'Jerusalem' },
    { fullName: 'Ibrahim Almasri', phone: '054-333-9998', email: 'ibrahim.almasri@gmail.com', city: 'Nazareth' },
    { fullName: 'Talia Cohen', phone: '055-444-8888', email: 'talia.cohen@gmail.com', city: 'Be\'er Sheva' },
    { fullName: 'David Ben-David', phone: '052-777-3333', email: 'david.bendavid@gmail.com', city: 'Netanya' },
    { fullName: 'Leila Halabi', phone: '054-222-3333', email: 'leila.halabi@gmail.com', city: 'Nazareth' },
    { fullName: 'Ahmed Abed', phone: '054-333-9999', email: 'ahmed.abed@gmail.com', city: 'Nazareth' }
  ];
  const { t } = useTranslation();

  return (
    <>
      <div className="mt-4 left-side flex flex-col gap-4">
        <h1 className="text-4xl w-full text-start text-black">
          {t("edit-drivers-title")}
        </h1>
        <div className="flex justify-start items-center text-center flex-col gap-6 p-6 bg-white rounded-2xl w-full h-fit shadow-xl">
          <DriversTable drivers={drivers} type={"edit"} />
          <div className="flex justify-end mt-4">
            <Button
              text={t("save-button")}
              type="primary"
              onClick={() => { }}
              customClassName={"text-base"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default adminEdit;
