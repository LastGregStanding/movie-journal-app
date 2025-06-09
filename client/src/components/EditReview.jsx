import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditReview = ({ movieReview }) => {
  const { selectedMovie, setActiveModal } = useContext(AuthContext);
  const [rating, setRating] = useState(movieReview[0].rating);
  const [updatedReview, setUpdatedReview] = useState(movieReview[0].review);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMovieReview = {
      movieId: selectedMovie.id,
      rating: Number(rating),
      updatedReview,
    };

    try {
      const response = await axios.patch(
        "http://localhost:5150/api/reviews/update-review",
        newMovieReview,
        { withCredentials: true }
      );
      console.log("Successfully updated movie:", response);
      setActiveModal("");
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <div>
      <div className="modal-overlay">
        <form className="modal-content" onSubmit={handleSubmit}>
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
            Review
          </h2>
          <input
            className="review-rating"
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <textarea
            placeholder="Your review..."
            className="review-input-box"
            type="text"
            value={updatedReview}
            onChange={(e) => setUpdatedReview(e.target.value)}
          />
          <button className="submit-review-btn">Update Review</button>
        </form>
      </div>
    </div>
  );
};

export default EditReview;
