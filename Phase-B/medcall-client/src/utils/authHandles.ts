import { toast } from "react-toastify";
import {
  DecodedToken,
  SignInFormData,
  SignUpFormData,
} from "../interfaces/types";
import { loginUser, registerUser } from "../services/userService";
import { base64UrlDecode } from "./helpers";
import {
  getSessionStorageWithExpiry,
  removeSessionStorageItem,
} from "./sessionStorageHandler";
import { resetUser, setUser } from "../redux/Slicers";
import store from "../redux/store";

export const handleSignUp = async (
  formData: SignUpFormData,
  activeTab: string
) => {
  try {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill all the fields", {
        position: "bottom-center",
        hideProgressBar: true,
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", {
        position: "bottom-center",
        hideProgressBar: true,
      });
      return;
    }

    // Create a new User object from formData
    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      password: formData.password,
      role: activeTab,
    };

    // Call registerUser function to send newUser to backend
    await registerUser(newUser);

    toast.success("Registered successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return true;
  } catch (error) {
    console.error("Error signing up:", error);
    toast.error("Failed to register user", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
  return false;
};

export const handleSignIn = async (formData: SignInFormData) => {
  try {
    if (!formData.email || !formData.password) {
      toast.error("Please fill all the fields", {
        position: "bottom-center",
        hideProgressBar: true,
      });
      return;
    }

    const user = {
      email: formData.email,
      password: formData.password,
    };

    // Call loginUser function to send user to backend
    await loginUser(user);

    toast.success("Sign in successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return true;
  } catch (error) {
    console.error("Error signing in:", error);
    toast.error("Failed to sign in", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
  return false;
};

export const handleLogout = () => {
  removeSessionStorageItem("token");
  store.dispatch(resetUser());
};

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }

    const payload = base64UrlDecode(parts[1]);
    const decoded: DecodedToken = JSON.parse(payload);

    return decoded;
  } catch (err) {
    console.error("Error decoding token:", err);
    throw err;
  }
};

export const isTokenValid = () => {
  const token = getSessionStorageWithExpiry("token");
  if (token) {

    const userData = decodeToken(token);
    if (userData) {
      store.dispatch(setUser(userData));
      return userData;
    }
  }
  return null;
};
