import mongoose, { Types } from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    callerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    patientAge: { type: Number, required: true },
    emergencyType: { type: String, required: true },
    consciousness: { type: String, required: true },
    breathingStatus: { type: String, required: true },
    bleeding: { type: String, required: true },
    painLevel: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: "Users", default: null },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;
