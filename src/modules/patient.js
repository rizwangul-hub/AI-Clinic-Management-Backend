import mongoose from "mongoose";

const patientSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },

      age: Number,

      gender: String,

      contact: String,

      medicalHistory: [
        {
          type: String,
        },
      ],

      createdBy: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

export const Patient =
  mongoose.model(
    "Patient",
    patientSchema
  );