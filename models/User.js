import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 1024,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 11,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
