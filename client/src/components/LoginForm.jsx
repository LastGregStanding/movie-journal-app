import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  const { loggedIn, setLoggedIn, setActiveModal } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
        "http://localhost:5150/api/auth/login",
        formData,
        { withCredentials: true }
      );
      console.log("Login successful:", response);
      setLoggedIn(true);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  if (loggedIn) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Welcome back {formData.username}!</h2>
          <button className="pop-up-btn" onClick={() => setActiveModal("")}>
            Start Journaling!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content login-register-container">
        <FontAwesomeIcon
          className="icon exit-btn"
          onClick={() => setActiveModal("")}
          icon={faX}
        />
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-input-container">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-input-container">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="login-register-btn" type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
