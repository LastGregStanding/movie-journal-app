import express from "express";
import authenticateJWT from "../middlewares/authenticateJWT.mjs";
import getLibrary from "../controllers/libraryController.mjs";
const router = express.Router();

router.get("/", authenticateJWT, getLibrary);

export default router;
