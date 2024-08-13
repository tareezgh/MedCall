import React from 'react';
import { EditIcon, DeleteIcon } from "./icons";
import Button from './Button';
import { useTranslation } from "react-i18next";

interface DriversTableProps {
  drivers: Array<{
    fullName: string;
    phone: string;
    email: string;
    city: string;
  }>;
  type: string;
}

const DriversTable: React.FC<DriversTableProps> = ({ drivers, type }) => {
  const { t } = useTranslation();

  return (
    <table className="min-w-full bg-white rounded-2xl shadow">
      <thead>
        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
          <th className="py-3 px-6 text-left rounded-tl-2xl">{t("full-name")}</th>
          <th className="py-3 px-6 text-left">{t("phone")}</th>
          <th className="py-3 px-6 text-left">{t("login-email-placeholder")}</th>
          <th className="py-3 px-6 text-left">{t("city")}</th>
          <th className="py-3 px-6 text-center">{t("driver-license")}</th>
          <th className="py-3 px-6 text-center rounded-tr-2xl">{t("action")}</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {drivers.map((driver, index) => (
          <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left whitespace-nowrap">{driver.fullName}</td>
            <td className="py-3 px-6 text-left">{driver.phone}</td>
            <td className="py-3 px-6 text-left">{driver.email}</td>
            <td className="py-3 px-6 text-left">{driver.city}</td>
            <td className="py-3 px-6 text-center text-red-600">
              drivers license
            </td>
            <td className="py-3 px-6 text-center">
              {type === "edit" ? (
                <div className="flex item-center justify-center gap-4">
                  <EditIcon />
                  <DeleteIcon />
                </div>
              ) : (
                <div className="flex item-center justify-center gap-4">
                  <Button
                    text={t("approve")}
                    type="primary"
                    onClick={()=>{}}
                    customClassName={"text-xs bg-blue-900 hover:bg-blue-950"}
                  />
                   <Button
                    text={t("decline-request")}
                    type="secondary"
                    onClick={()=>{}}
                    customClassName={"text-xs bg-white hover:bg-slate-400"}
                  />
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DriversTable;
