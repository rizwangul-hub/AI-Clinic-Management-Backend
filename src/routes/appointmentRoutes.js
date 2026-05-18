import express from "express";
import { bookAppointment, cancelAppointment, doctorSchedule, updateAppointmentStatus, getAllAppointments } from "../controllers/appointmentController.js";
import { authMiddleware, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

/**
 * GET ALL APPOINTMENTS (RECEPTIONIST / ADMIN)
 */
router.get(
  "/",
  authMiddleware,
  authorizeRoles("receptionist", "admin"),
  getAllAppointments
);

/**
 * BOOK APPOINTMENT
 * Patient OR Receptionist
 */
router.post(
  "/book",
  authMiddleware,
  authorizeRoles("patient", "receptionist"),
  bookAppointment
);

/**
 * CANCEL APPOINTMENT
 */
router.put(
  "/cancel/:id",
  authMiddleware,
  authorizeRoles("patient", "receptionist", "doctor"),
  cancelAppointment
);

/**
 * UPDATE STATUS (doctor/receptionist)
 */
router.patch(
  "/status/:id",
  authMiddleware,
  authorizeRoles("doctor", "receptionist"),
  updateAppointmentStatus
);

/**
 * DOCTOR SCHEDULE
 */
router.get(
  "/doctor-schedule",
  authMiddleware,
  authorizeRoles("doctor"),
  doctorSchedule
);

export default router;