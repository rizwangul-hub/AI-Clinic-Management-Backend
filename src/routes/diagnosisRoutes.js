import express from "express";
import { authMiddleware, authorizeRoles } from "../middleware/auth.js";
import { addDiagnosis, getDiagnosisHistory } from "../controllers/diagnosisController.js";


const router = express.Router();

/**
 * ADD DIAGNOSIS (DOCTOR ONLY)
 */
router.post(
  "/add",
  authMiddleware,
  authorizeRoles("doctor"),
  addDiagnosis
);

/**
 * GET DIAGNOSIS HISTORY
 */
router.get(
  "/patient/:id",
  authMiddleware,
  authorizeRoles("doctor", "patient"),
  getDiagnosisHistory
);

export default router;