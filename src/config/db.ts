import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const createConnection = async function () {
  try {
     await mongoose.connect(process.env.DB_URI as string);
    console.log("Database connected successfully");
  } catch (error) {
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

const resturantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const ResturantModel = mongoose.model("resturant", resturantSchema);

export { createConnection, ResturantModel };
