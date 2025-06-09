import express from "express";
import authenticateJWT from "../middlewares/authenticateJWT.mjs";
import {
  addReview,
  getReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.mjs";
const router = express.Router();

router.get("/:movieId", authenticateJWT, getReview);
router.post("/addreview", authenticateJWT, addReview);
router.patch("/update-review", authenticateJWT, updateReview);
router.delete("/delete-review", authenticateJWT, deleteReview);

export default router;
