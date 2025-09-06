// backend/src/config/db.js
import mongoose from "mongoose";
export default async function connectDB() {
  const uri = process.env.MONGO_URI ;
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}
