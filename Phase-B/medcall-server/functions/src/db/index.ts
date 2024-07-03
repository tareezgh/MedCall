import mongoose from "mongoose";
const functions = require("firebase-functions");
mongoose.set("strictQuery", true);

const connectDb = async () => {
  const mongoDbUrl = functions.config().mongodb.url;
  if (!mongoDbUrl) {
    throw new Error("MONGODB_URL is not defined in environment variables");
  }
  await mongoose.connect(mongoDbUrl);
};
export { connectDb };
