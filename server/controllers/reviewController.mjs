import {
  addReviewDB,
  getReviewDB,
  updateReviewDB,
  deleteReviewDB,
} from "../models/reviewModel.mjs";

const getReview = async (req, res) => {
  const userId = req.user.id;
  const movieId = req.params.movieId;

  try {
    const data = await getReviewDB(userId, movieId);
    res.json(data);
  } catch (error) {
    console.log("Error retrieving review:", error);
  }
};

const addReview = async (req, res) => {
  const { movieId, rating, newReview } = req.body;
  const userId = req.user.id;
  try {
    await addReviewDB(userId, movieId, rating, newReview);
    res.json({ success: true });
  } catch (error) {
    console.log("Error adding review:", error);
  }
};

const updateReview = async (req, res) => {
  const { movieId, rating, updatedReview } = req.body;
  const userId = req.user.id;
  try {
    await updateReviewDB(userId, movieId, rating, updatedReview);
    res.json({ success: true });
  } catch (error) {
    console.log("Error updating review:", error);
  }
};

const deleteReview = async (req, res) => {
  const userId = req.user.id;
  const { movieId } = req.body;
  try {
    await deleteReviewDB(userId, movieId);
    res.json("Successfully deleted");
  } catch (error) {
    console.log("Error deleting review:", error);
  }
};

export { addReview, getReview, updateReview, deleteReview };
