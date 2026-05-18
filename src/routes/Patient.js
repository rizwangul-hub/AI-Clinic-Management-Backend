import express from "express";
import { authMiddleware, authorizeRoles } from "../middleware/auth.js";
import { addPatient, getPatientTimeline, getPatients, editPatient } from "../controllers/patientController.js";

const router = express.Router();

/**
 * GET ALL PATIENTS (ADMIN / DOCTOR / RECEPTIONIST)
 */
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "doctor", "receptionist"),
  getPatients
);

/**
 * ADD PATIENT (RECEPTIONIST / ADMIN)
 */
router.post(
  "/add",
  authMiddleware,
  authorizeRoles(
    "receptionist",
    "admin"
  ),
  addPatient
);

/**
 * UPDATE PATIENT DETAILS (RECEPTIONIST / ADMIN)
 */
router.put(
  "/edit/:id",
  authMiddleware,
  authorizeRoles("receptionist", "admin"),
  editPatient
);

/**
 * PATIENT HISTORY
 */
router.get(
  "/history/:id",
  authMiddleware,
  authorizeRoles("patient", "doctor", "receptionist", "admin"),
  getPatientTimeline
);

export default router;