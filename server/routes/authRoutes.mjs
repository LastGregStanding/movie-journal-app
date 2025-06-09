import express from "express";
import {
  registerUser,
  loginUser,
  authenticateUser,
  logoutUser,
} from "../controllers/authController.mjs";
import authenticateJWT from "../middlewares/authenticateJWT.mjs";
const router = express.Router();

// Register a new user
router.post("/register-user", registerUser);

// Log a user in
router.post("/login", loginUser);

// Log a user out
router.post("/logout", logoutUser);

// Check user token
router.get("/me", authenticateJWT, authenticateUser);

export default router;
