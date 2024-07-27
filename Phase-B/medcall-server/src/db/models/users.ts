import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { type: String, required: true },
    city: { type: String, required: false },
    address: { type: String, required: false },
    zipCode: { type: String, required: false },
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }],
    isGoogleSignIn: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", usersSchema);

export default Users;
