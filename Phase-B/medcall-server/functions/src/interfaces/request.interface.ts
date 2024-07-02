import mongoose from "mongoose";

export interface IRequest {
  userId: mongoose.Schema.Types.ObjectId;
  requestId: string;
  key: string;
  location: {
    address: string;
    lat: number;
    long: number;
  };
  driverName: string;
  status: string;
  callerName: string;
  phoneNumber: string;
  patientAge: number;
  emergencyType: string;
  consciousness: string;
  breathingStatus: string;
  bleeding: string;
  painLevel: string;
  optionalAllergies: string;
  optionalMedications: string;
  optionalActivities: string;
}
