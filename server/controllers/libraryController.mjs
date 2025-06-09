import getLibraryMovies from "../models/libraryModel.mjs";

const getLibrary = async (req, res) => {
  try {
    const userId = req.user.id;
    const library = await getLibraryMovies(userId);
    res.json(library);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve library" });
  }
};

export default getLibrary;
