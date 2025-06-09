import DeleteAlert from "./DeleteAlert";
import EditReview from "./EditReview";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { faEdit, faX, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CurrentReview = ({ movieReview }) => {
  const { selectedMovie, setActiveModal } = useContext(AuthContext);
  const [deleteMovie, setDeleteMovie] = useState(false);
  const [editMovie, setEditMovie] = useState(false);

  function handleDeleteMovie() {
    setDeleteMovie(true);
  }

  function handleEditMovie() {
    setEditMovie(true);
  }

  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-content review-container">
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
          <h3>Score: {movieReview[0].rating}</h3>
          <h3>
            Date: {new Date(movieReview[0].created_at).toLocaleDateString()}
          </h3>
          <p className="review-text">{movieReview[0].review}</p>
          <FontAwesomeIcon
            className="icon"
            onClick={handleEditMovie}
            icon={faEdit}
          />
          <FontAwesomeIcon
            className="icon"
            onClick={handleDeleteMovie}
            icon={faTrashCan}
          />
        </div>
        {deleteMovie && (
          <DeleteAlert
            selectedMovie={selectedMovie}
            setDeleteMovie={setDeleteMovie}
          />
        )}
        {editMovie && (
          <EditReview
            movieReview={movieReview}
            handleEditMovie={handleEditMovie}
          />
        )}
      </div>
    </div>
  );
};

export default CurrentReview;
