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
  userId: string | null; // Allow null for anonymous users
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
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface DecodedToken {
  email: string;
  role: string;
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

