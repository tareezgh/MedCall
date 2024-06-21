export interface IRequest {
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
