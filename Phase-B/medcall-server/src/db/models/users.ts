import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    firstName:{ type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber:{ type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    requests: { type: Array, required: false },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", usersSchema);

export default Users;