import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    const indexes = await mongoose.connection.db.collection("users").indexes();

    const hasUsernameIndex = indexes.some(index => index.name === "username_1");

    if (hasUsernameIndex) {
      await mongoose.connection.db.collection("users").dropIndex("username_1");
      console.log("Dropped username_1 index");
    } else {
      console.log("username_1 index not found, no need to drop");
    }

  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};
