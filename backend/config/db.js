import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    // console.log(uri,"uri");
    await mongoose.connect(uri);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};
