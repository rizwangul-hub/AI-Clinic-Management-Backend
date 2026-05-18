import express from "express";
import { config } from "dotenv";
import authRouter from "./src/routes/auth.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import doctorRoutes from "./src/routes/Doctor.js";
import receptionistRoutes from "./src/routes/Receptionist.js";
import patientRoutes from "./src/routes/Patient.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import prescriptionRoutes from "./src/routes/prescriptionRoutes.js";
import diagnosisRoutes from "./src/routes/diagnosisRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import cors from "cors";
import { connectionDB } from "./src/config/db.js";
import cookieParser from "cookie-parser";

config();
const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:3000",
        process.env.FRONTEND_URL,
      ];
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.includes("vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
connectionDB();
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/receptionist", receptionistRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/diagnosis", diagnosisRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
