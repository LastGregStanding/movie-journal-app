import express from "express";
import authenticateJWT from "../middlewares/authenticateJWT.mjs";
import addMovie from "../controllers/movieController.mjs";
const router = express.Router();

router.post("/addmovie", authenticateJWT, addMovie);

export default router;
