import express from "express";
import { registerUser, loginUser } from "../controllers/authController.mjs";
const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login", loginUser);
// router.post("/logout", authController.logout);

export default router;
