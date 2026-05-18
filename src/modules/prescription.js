import mongoose from "mongoose";

const prescriptionSchema =
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

      medicines: [
        {
          medicineName:
            String,
          dosage: String,
          duration: String,
        },
      ],

      instructions:
        String,

      pdfUrl: String,
    },
    {
      timestamps: true,
    }
  );

export const Prescription = mongoose.model(
  "Prescription",
  prescriptionSchema
);