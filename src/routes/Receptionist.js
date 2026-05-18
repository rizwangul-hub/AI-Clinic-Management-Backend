import express from "express";
import { authMiddleware, authorizeRoles } from "../middleware/auth.js";
import { addPatient } from "../controllers/patientController.js";

const router = express.Router();

router.post(
  "/register-patient",
  authMiddleware,
  authorizeRoles(
    "receptionist",
    "admin"
  ),
  addPatient
);

export default router;