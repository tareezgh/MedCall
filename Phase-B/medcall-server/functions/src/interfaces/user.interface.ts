import mongoose from "mongoose";

export interface User {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  phoneNumber?: string| null;
  email: string;
  password?: string| null;
  role: string;
  city?: string | null;
  address?: string | null;
  zipCode?: string | null;
  driverStatus?: string | null;
  requests: mongoose.Types.ObjectId[];
  isGoogleSignIn: boolean;
  otp?: string;
  otpExpiry?: Date;
}

export interface LoginSuccessResult {
  status: "success";
  message: string;
  token: string;
}

export interface LoginFailureResult {
  status: "failure";
  message: string;
}
