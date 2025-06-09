import {
  addMovieDB,
  findMovieByTitle,
  addMovieToLibrary,
} from "../models/movieModel.mjs";

const addMovie = async (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;

  // Check if movie is already in DB
  const searchDB = await findMovieByTitle(title);
  if (searchDB) {
    // If movie is in DB, add to user library
    const movieId = searchDB.id;
    await addMovieToLibrary(userId, movieId);
    return res.json({ success: true });
  }

  // Fetch movie from API
  const data = await searchMovie(title);
  const poster_url = data.results[0].poster_path;
  const movieId = data.results[0].id;

  try {
    await addMovieDB(movieId, title, poster_url);
    await addMovieToLibrary(userId, movieId);
    res.json({ success: true });
  } catch (error) {
    console.log("Error adding movie:", error);
  }
};

// Fetch the movie from the API
const searchMovie = async (title) => {
  const apiKey = "a0e64e14720d95c4a28ca4566c7d0ffd";

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    title
  )}`;

  const response = await fetch(url);
  return await response.json();
};

export default addMovie;
