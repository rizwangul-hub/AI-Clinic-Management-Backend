import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },

    role: {
      type: String,
      enum: ["Admin", "Doctor", "Receptionist", "Patient"],
      required: true,
      default: "Patient",
    },

    subscriptionPlan: {
      type: String,
      enum: ["Free", "Basic", "Premium"],
      default: "Free",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);