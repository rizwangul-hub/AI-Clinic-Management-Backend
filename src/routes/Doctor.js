import express from "express";
import { authMiddleware, authorizeRoles } from "../middleware/auth.js";
import { doctorSchedule } from "../controllers/appointmentController.js";

const router = express.Router();

router.get(
  "/appointments",
  authMiddleware,
  authorizeRoles("doctor"),
  doctorSchedule
);

export default router;