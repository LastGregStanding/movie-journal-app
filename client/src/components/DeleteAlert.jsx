import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const DeleteAlert = ({ setDeleteMovie, selectedMovie }) => {
  const { setActiveModal } = useContext(AuthContext);
  const handleDeleteMovie = async () => {
    try {
      console.log(selectedMovie);
      const response = await axios.delete(
        "http://localhost:5150/api/reviews/delete-review",
        {
          data: { movieId: selectedMovie.id },
          withCredentials: true,
        }
      );
      console.log("Successfully deleted movie:", response);
      setActiveModal("");
    } catch (error) {
      console.error("Could not delete movie:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content delete-alert">
        <h2>Are you sure you want to remove this movie from your library?</h2>
        <button
          className="delete-alert-btn yes-btn"
          type="button"
          onClick={handleDeleteMovie}
        >
          Yes
        </button>
        <button
          className="delete-alert-btn no-btn"
          onClick={() => setDeleteMovie(false)}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
