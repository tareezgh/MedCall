import mongoose from "mongoose";


const usersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    city: { type: String, required: false },
    address: { type: String, required: false },
    zipCode: { type: String, required: false },
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }],
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", usersSchema);

export default Users;
