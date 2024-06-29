import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const usersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }],
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", usersSchema);

export default Users;
