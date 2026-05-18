import express from "express";
import { authMiddleware, authorizeRoles } from "../middleware/auth.js";
import { addPrescription, getPatientPrescriptions, downloadPrescriptionPDF } from "../controllers/prescriptionController.js";

const router = express.Router();

/**
 * ADD PRESCRIPTION (DOCTOR ONLY)
 */
router.post(
  "/add",
  authMiddleware,
  authorizeRoles("doctor"),
  addPrescription
);

/**
 * GET PATIENT PRESCRIPTIONS
 */
router.get(
  "/patient/:id",
  authMiddleware,
  authorizeRoles("doctor", "patient"),
  getPatientPrescriptions
);

/**
 * DOWNLOAD PRESCRIPTION PDF
 */
router.get(
  "/download/:id",
  authMiddleware,
  authorizeRoles("doctor", "patient"),
  downloadPrescriptionPDF
);

export default router;