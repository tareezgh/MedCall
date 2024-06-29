import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDb = async () => {
  const mongoDbUrl = process.env.MONGODB_URL;
  if (!mongoDbUrl) {
    throw new Error("MONGODB_URL is not defined in environment variables");
  }
  await mongoose.connect(mongoDbUrl);
};
export { connectDb };
