import axios from "axios";
import { toast } from "react-toastify";
import { requestUrl, updateRequestUrl } from "./constants";
import { AmbulanceRequest } from "../interfaces/types";

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

export const updateRequestStatus = async (requestId: string) => {
  //TODO
  const args = {
    driverName: "aaaaaa",
    status: "in progress",
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

export const fetchActiveRequest = async () => {
  // Mock response for illustration purposes
  return {
    status: "active", // This can be "active", "completed", "none", etc.
    request: {
      date: "2024-07-01",
      typeOfEmergency: "Cardiac Arrest",
      location: "123 Main St",
    },
  };
};
