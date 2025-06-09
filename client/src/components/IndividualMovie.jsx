import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const IndividualMovie = ({ movie }) => {
  const { setSelectedMovie, setActiveModal } = useContext(AuthContext);

  function handleSelectedMovie() {
    setSelectedMovie(movie);
    setActiveModal("review");
  }

  return (
    <div>
      <div onClick={handleSelectedMovie} className="movie-slide-img">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_url}`}
          alt="poster"
        />
      </div>
    </div>
  );
};

export default IndividualMovie;
