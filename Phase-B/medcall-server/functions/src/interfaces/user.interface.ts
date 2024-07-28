import mongoose from "mongoose";

export interface User {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
  city?: string | null;
  address?: string | null;
  zipCode?: string | null;
  requests: mongoose.Types.ObjectId[];
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
