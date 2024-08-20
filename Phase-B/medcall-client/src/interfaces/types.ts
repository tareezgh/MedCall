export interface User {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  password?: string;
  role: string;
  city?: string;
  address?: string;
  zipCode?: string;
  driverStatus?: string;
  requests?: Array<any>;
  isGoogleSignIn: boolean;
}

export interface AmbulanceRequest {
  userId: string | null; // Allow null for anonymous users
  location: {
    address?: string;
    lat: number;
    long: number;
  };
  driverName?: string;
  status?: string;
  callerName: string;
  phoneNumber: string;
  patientAge: number;
  emergencyType: string;
  consciousness: string;
  breathingStatus: string;
  bleeding: string;
  painLevel: string;
  optionalAllergies?: string;
  optionalMedications?: string;
  optionalActivities?: string;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  city: string;
  address: string;
  zipCode: string;
}

export interface ResetPasswordFormData {
  email: string;
  password: string;
  confirmPassword: string,
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface EditProfileData{
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export interface DecodedToken {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  iat: number;
  exp: number;
}

export interface RequestAmbulanceFormData {
  callerName: string;
  phoneNumber: string;
  patientAge: string;
  optionalAllergies: string;
  optionalMedications: string;
  optionalActivities: string;
}

export type TabsTypes =
  | "dashboard"
  | "tracking"
  | "messages"
  | "profile"
  | "driverTracking"
  | "driverRequest"
  | "adminEdit"
  | "logout";
