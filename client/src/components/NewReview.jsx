import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteAlert from "./DeleteAlert";

const NewReview = () => {
  const [rating, setRating] = useState("");
  const [newReview, setNewReview] = useState("");
  const [deleteMovie, setDeleteMovie] = useState(false);
  const { selectedMovie, setActiveModal } = useContext(AuthContext);

  function handleDeleteMovie() {
    setDeleteMovie(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMovieReview = {
      movieId: selectedMovie.id,
      rating: Number(rating),
      newReview,
    };

    try {
      const response = await axios.post(
        "http://localhost:5150/api/reviews/addreview",
        newMovieReview,
        { withCredentials: true }
      );
      console.log("Successfully added movie:", response);
      setActiveModal("");
    } catch (error) {
      console.error("Could not add movie:", error);
    }
  };

  return (
    <div>
      <div className="modal-overlay">
        <form className="modal-content review-container">
          <FontAwesomeIcon
            className="icon exit-btn"
            onClick={() => setActiveModal("")}
            icon={faX}
          />
          <h2>
            {selectedMovie.title
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}{" "}
          </h2>
          <input
            className="review-rating"
            placeholder="Your rating..."
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <textarea
            placeholder="Your review..."
            className="review-input-box"
            type="text"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <br></br>
          <button onClick={handleSubmit} className="submit-review-btn">
            Submit Review
          </button>
          <br />
          <button
            type="button"
            className="delete-movie-btn"
            onClick={handleDeleteMovie}
          >
            Remove Movie
          </button>
        </form>
        {deleteMovie && (
          <DeleteAlert
            selectedMovie={selectedMovie}
            setDeleteMovie={setDeleteMovie}
          />
        )}
      </div>
    </div>
  );
};

export default NewReview;
