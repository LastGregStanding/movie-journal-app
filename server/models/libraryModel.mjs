import pool from "../database/db-connector.mjs";

const getLibraryMovies = (userId) =>
  pool.promise().query("CALL GetLibrary(?)", [userId]);

export default getLibraryMovies;
