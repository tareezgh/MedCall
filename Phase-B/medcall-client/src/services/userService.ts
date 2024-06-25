import axios from "axios";
import { toast } from "react-toastify";
import { loginUrl, registerUrl } from "./constants";
import { User } from "../interfaces/types";
import { setSessionStorageWithExpiry } from "../utils/sessionStorageHandler";

export const registerUser = async (user: User) => {
  console.log("🚀 ~ registerUser ~ user:", user);
  const args = {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    password: user.password,
    role: user.role || "User",
  };

  const response = await axios.post(registerUrl, args);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};

export const loginUser = async (user: Partial<User>) => {
  console.log("🚀 ~ loginUser ~ user:", user);
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
    const role = response.data.role;

    // Store the token in sessionStorage with an expiration time of 1 hour
    setSessionStorageWithExpiry("token", token, 60); // 60 minutes
    localStorage.setItem("role", role);
    return args;
  }
};
