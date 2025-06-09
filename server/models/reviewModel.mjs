import pool from "../database/db-connector.mjs";

const getReviewDB = async (userId, movieId) => {
  const [rows] = await pool
    .promise()
    .query("CALL GetReview(?, ?)", [userId, movieId]);
  return rows.length > 0 ? rows[0] : null;
};

const addReviewDB = (userId, movieId, rating, review) =>
  pool
    .promise()
    .query("CALL AddReview(?, ?, ?, ?)", [userId, movieId, rating, review]);

const updateReviewDB = (userId, movieId, rating, review) =>
  pool
    .promise()
    .query("CALL UpdateReview(?, ?, ?, ?)", [userId, movieId, rating, review]);

const deleteReviewDB = (userId, movieId) => {
  pool.promise().query("CALL DeleteReview(?,?)", [userId, movieId]);
};

export { addReviewDB, getReviewDB, updateReviewDB, deleteReviewDB };
