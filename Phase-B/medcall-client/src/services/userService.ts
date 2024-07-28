import axios from "axios";
import { toast } from "react-toastify";
import {
  loginUrl,
  registerUrl,
  requestOtpUrl,
  resetPasswordUrl,
  verifyOtpUrl,
} from "./constants";
import { User } from "../interfaces/types";
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
    password: user.password,
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
