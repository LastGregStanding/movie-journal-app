import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import NewReview from "./NewReview";
import CurrentReview from "./CurrentReview";

const ReviewModal = () => {
  const [movieReview, setMovieReview] = useState([]);
  const { selectedMovie } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5150/api/reviews/${selectedMovie.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Successfully retrieved review: ", res.data);
        setMovieReview(res.data);
      })
      .catch((err) => {
        console.error("Failed to retrieve review:", err);
      });
  }, [selectedMovie.id]);

  return (
    <div>
      {movieReview.length ? (
        <CurrentReview movieReview={movieReview} />
      ) : (
        <NewReview />
      )}
    </div>
  );
};

export default ReviewModal;
