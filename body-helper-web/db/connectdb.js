import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from the database'");
  } catch (error) {
    console.error("Error disconnecting from the database", error.message);
  }
}

export default connectDB;
