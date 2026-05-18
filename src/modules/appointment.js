import mongoose from "mongoose";

const appointmentSchema =
  new mongoose.Schema(
    {
      patient: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
        required: true,
      },

      doctor: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
        required: true,
      },

      date: {
        type: Date,
        required: true,
      },

      time: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "pending",
          "approved",
          "completed",
          "cancelled",
        ],
        default: "pending",
      },

      bookedBy: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },
    },
    { timestamps: true }
  );

export const Appointment =
  mongoose.model(
    "Appointment",
    appointmentSchema
  );