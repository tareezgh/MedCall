import axios from "axios";
import { toast } from "react-toastify";
import {
  activeRequestUrl,
  guestRequestUrl,
  requestUrl,
  updateRequestUrl,
} from "./constants";
import { AmbulanceRequest, StatusType } from "../interfaces/types";

export const postNewRequest = async (request: AmbulanceRequest) => {
  const args = {
    userId: request.userId,
    location: {
      address: request.location.address,
      lat: request.location.lat,
      long: request.location.long,
    },
    driverName: request.driverName,
    status: request.status || "starting",
    callerName: request.callerName,
    phoneNumber: request.phoneNumber,
    patientAge: request.patientAge,
    emergencyType: request.emergencyType,
    consciousness: request.consciousness,
    breathingStatus: request.breathingStatus,
    bleeding: request.bleeding,
    painLevel: request.painLevel,
    optionalAllergies: request.optionalAllergies,
    optionalMedications: request.optionalMedications,
    optionalActivities: request.optionalActivities,
  };

  const response = await axios.post(requestUrl, args);
  console.log("🚀 ~ postNewRequest ~ response:", response);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return false;
  }
  return true;
};

export const getAllRequests = async () => {
  const response = await axios.get(requestUrl);
  console.log("🚀 ~ getAllRequest ~ response:", response);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return null;
  }

  return response.data;
};

export const getRequestById = async (userId: string) => {
  const response = await axios.get(`${requestUrl}/${userId}`);
  console.log("🚀 ~ getRequestById ~ response:", response);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return null;
  }

  return response.data;
};

export const getActiveRequest = async (
  currentUserID: string,
  status?: string
) => {
  const args = {
    status: status || "active",
    id: currentUserID,
  };
  const response = await axios.post(`${activeRequestUrl}`, args);
  console.log("🚀 ~ getActiveRequest ~ response:", response);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return null;
  }

  return response.data;
};

export const getGuestRequest = async (
  guestPhoneNumber: string,
  status?: string
) => {
  const args = {
    status: status || "active",
    phoneNumber: guestPhoneNumber,
  };
  const response = await axios.post(`${guestRequestUrl}`, args);
  console.log("🚀 ~ getGuestRequest ~ response:", response);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return null;
  }

  return response.data;
};

export const updateRequestStatus = async (
  requestId: string,
  newStatus: StatusType,
  currentDriverId: string,
  currentDriverName: string,
  currentDriverLocation?: { address?: string; lat: number; long: number }
) => {
  const args = {
    driverId: currentDriverId,
    driverName: currentDriverName,
    status: newStatus,
    driverLocation: currentDriverLocation,
  };
  const response = await axios.patch(`${updateRequestUrl}/${requestId}`, args);
  console.log("🚀 ~ updateRequestStatus ~ response:", response);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return null;
  }

  return response.data;
};
