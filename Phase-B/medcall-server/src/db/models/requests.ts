import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    location: {
      type: {
        address: { type: String, required: false },
        lat: { type: Number, required: true },
        long: { type: Number, required: true },
      },
      required: true,
    },
    driverName: { type: String, required: false },
    driverLocation: {
      type: {
        address: { type: String, required: false },
        lat: { type: Number, required: true },
        long: { type: Number, required: true },
      },
      required: false,
    },
    status: { type: String, required: false },
    callerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    patientAge: { type: Number, required: true },
    emergencyType: { type: String, required: true },
    consciousness: { type: String, required: true },
    breathingStatus: { type: String, required: true },
    bleeding: { type: String, required: true },
    painLevel: { type: String, required: true },
    optionalAllergies: { type: String, required: false },
    optionalMedications: { type: String, required: false },
    optionalActivities: { type: String, required: false },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;
