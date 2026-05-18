import jwt from "jsonwebtoken";
import { User } from "../modules/user.js";

export const authMiddleware = async (
  req,
  res,
  next
) => {
  const token =
    req.headers.authorization?.split(
      " "
    )[1];

  if (!token) {
    return res.status(401).json({
      message:
        "Authorization header missing",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user =
      await User.findById(
        decoded.userId
      );

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.userId =
      decoded.userId;

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

// Role Middleware
export const authorizeRoles = (...roles) => (req, res, next) => {
  console.log("USER FROM AUTH:", req.user);
  console.log("USER ROLE:", req.user?.role);

  const lowerRoles = roles.map(r => r.toLowerCase());
  const userRole = (req.user?.role || "Patient").toLowerCase();

  if (!userRole || !lowerRoles.includes(userRole)) {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  next();
};