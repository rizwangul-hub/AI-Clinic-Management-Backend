import express from "express";
import { authMiddleware, authorizeRoles } from "../middleware/auth.js";
import {
  adminDashboard,
  getAllDoctors,
} from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles("admin"),
  adminDashboard,
);

router.get("/doctors", authMiddleware, authorizeRoles("admin", "receptionist", "doctor", "patient"), getAllDoctors);

export default router;
