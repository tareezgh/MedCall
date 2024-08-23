import axios from "axios";
import { toast } from "react-toastify";
import {
  deleteUserUrl,
  driverUpdateUrl,
  getDriversUrl,
  getPendingDriversUrl,
  loginUrl,
  registerUrl,
  requestOtpUrl,
  resetPasswordUrl,
  userUpdateUrl,
  verifyOtpUrl,
} from "./constants";
import { EditDriverData, EditProfileData, User } from "../interfaces/types";
import { setSessionStorageWithExpiry } from "../utils/sessionStorageHandler";

export const registerUser = async (user: User) => {
  const args = {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    password: user.password,
    role: user.role || "User",
    city: user.city,
    address: user.address,
    zipCode: user.zipCode,
    driverStatus: user.driverStatus,
    isGoogleSignIn: user.isGoogleSignIn,
  };

  const response = await axios.post(registerUrl, args);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  } else {
    const token = response.data.token;
    setSessionStorageWithExpiry("token", token, 60);
    return args;
  }
};

export const loginUser = async (user: Partial<User>) => {
  const args = {
    email: user.email,
    password: user.password || "",
    isGoogleSignIn: user.isGoogleSignIn,
  };

  const response = await axios.post(loginUrl, args, { withCredentials: true });

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return;
  } else {
    const token = response.data.token;
    // Store the token in sessionStorage with an expiration time of 1 hour
    setSessionStorageWithExpiry("token", token, 60);
    return args;
  }
};

export const editProfile = async (userId: string, data: EditProfileData) => {
  const args = {
    firstName: data.firstName,
    lastName: data.lastName,
    phoneNumber: data.phoneNumber,
    email: data.email,
  };

  const response = await axios.patch(`${userUpdateUrl}/${userId}`, args);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  } else {
    const token = response.data.token;
    // Store the token in sessionStorage with an expiration time of 1 hour
    setSessionStorageWithExpiry("token", token, 60);
    return response.data;
  }
};

export const changeDriverStatus = async (userId: string, status: string) => {
  const args = {
    driverStatus: status,
  };

  const response = await axios.patch(`${driverUpdateUrl}/${userId}`, args);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};

export const editDriver = async (userId: string, data: EditDriverData) => {
  const args = {
    firstName: data.firstName,
    lastName: data.lastName,
    phoneNumber: data.phoneNumber,
    email: data.email,
    city: data.city,
    address: data.address,
    zipCode: data.zipCode,
    driverStatus: data.driverStatus,
  };

  const response = await axios.patch(`${driverUpdateUrl}/${userId}`, args);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};

export const deleteDriver = async (driverId: string) => {
  const response = await axios.delete(`${deleteUserUrl}/${driverId}`);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
  return response;
};

export const sendOtp = async (email: string) => {
  try {
    const response = await axios.post(requestOtpUrl, { email });

    if (response.data.status === "failure") {
      toast.error(response.data.message, {
        position: "top-center",
        hideProgressBar: true,
      });
    } else {
      toast.success("OTP sent successfully", {
        position: "top-center",
        hideProgressBar: true,
      });
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    toast.error("Failed to send OTP", {
      position: "top-center",
      hideProgressBar: true,
    });
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await axios.post(verifyOtpUrl, { email, otp });

    if (response.data.status === "failure") {
      toast.error(response.data.message, {
        position: "top-center",
        hideProgressBar: true,
      });
      return false;
    } else {
      toast.success("OTP verified successfully", {
        position: "top-center",
        hideProgressBar: true,
      });
      return true;
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    toast.error("Failed to verify OTP", {
      position: "top-center",
      hideProgressBar: true,
    });
    return false;
  }
};

export const resetPassword = async (email: string, newPassword: string) => {
  try {
    const response = await axios.post(resetPasswordUrl, { email, newPassword });

    if (response.data.status === "failure") {
      toast.error(response.data.message, {
        position: "top-center",
        hideProgressBar: true,
      });
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    toast.error("Failed to reset password", {
      position: "top-center",
      hideProgressBar: true,
    });
  }
};

export const getDrivers = async (status?: string) => {
  try {
    let response;
    if (status) {
      response = await axios.post(getPendingDriversUrl, { status });
    } else {
      response = await axios.get(getDriversUrl);
    }

    if (response.data.status === "failure") {
      toast.error(response.data.message, {
        position: "top-center",
        hideProgressBar: true,
      });
    } else {
      return response.data;
    }
  } catch (error) {
    toast.error("Failed to get drivers request", {
      position: "top-center",
      hideProgressBar: true,
    });
  }
};
