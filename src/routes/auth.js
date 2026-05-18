import { Login, Register, GoogleLogin } from "../controllers/auth.js";
import express from "express";


const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/google", GoogleLogin);

export default router;
