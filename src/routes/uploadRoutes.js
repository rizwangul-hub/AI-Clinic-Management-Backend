import express from "express";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // Use upload_stream to stream the buffer directly to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { folder: "clinic-management" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return res.status(500).json({ message: "Failed to upload image" });
        }
        res.status(200).json({
          success: true,
          message: "Image uploaded successfully",
          url: result.secure_url,
        });
      }
    );

    stream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
