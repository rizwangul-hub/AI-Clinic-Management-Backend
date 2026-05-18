import mongoose from "mongoose";

const patientHistorySchema =
  new mongoose.Schema(
    {
      patient: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },

      doctor: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },

      symptoms: {
        type: String,
      },

      diagnosis: {
        type: String,
      },

      notes: {
        type: String,
      },

      aiResponse: {
        type: String,
      },

      riskLevel: {
        type: String,
        enum: [
          "low",
          "medium",
          "high",
        ],
      },
    },
    { timestamps: true }
  );

export const PatientHistory =
  mongoose.model(
    "PatientHistory",
    patientHistorySchema
  );