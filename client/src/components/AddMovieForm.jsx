import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const AddMovieForm = () => {
  const { setActiveModal } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5150/api/movies/addmovie",
        formData,
        { withCredentials: true }
      );
      setActiveModal("");
      console.log("Successfully added movie:", response);
    } catch (error) {
      console.error("Could not add movie", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FontAwesomeIcon
          className="icon exit-btn"
          onClick={() => setActiveModal("")}
          icon={faX}
        />
        <h2>Add Movie</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Movie Name</label>
            <input
              type="text"
              name="title"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Add Movie</button>
        </form>
      </div>
    </div>
  );
};

export default AddMovieForm;
