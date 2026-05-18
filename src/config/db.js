import mongoose from "mongoose";

export const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ Database Connected Successfully");
  } catch (error) {
    console.log("DB Connection Failed:");
    console.log(error.message);
    process.exit(1);
  }
};