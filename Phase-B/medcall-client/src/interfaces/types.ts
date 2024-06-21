export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
  requests?: Array<any>;
}

export interface AmbulanceRequest {
  callerName: string;
  phoneNumber: string;
  patientAge: number;
  emergencyType: string;
  consciousness: string;
  breathingStatus: string;
  bleeding: string;
  painLevel: string;
  userId: string | null; // Allow null for anonymous users
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface RequestAmbulanceFormData{
  callerName: string;
  phoneNumber: string;
  patientAge: string;
}