import pool from "../database/db-connector.mjs";

const addMovieDB = (movieId, title, poster_url) =>
  pool.promise().query("CALL AddMovie(?, ?, ?)", [movieId, title, poster_url]);

const addMovieToLibrary = (userId, movieId) =>
  pool.promise().query("CALL AddMovieToLibrary(?, ?)", [userId, movieId]);

const findMovieByTitle = async (title) => {
  const [rows] = await pool
    .promise()
    .query("SELECT * FROM movies WHERE LOWER(title) = LOWER(?)", [title]);
  return rows.length > 0 ? rows[0] : null;
};

export { addMovieDB, findMovieByTitle, addMovieToLibrary };
