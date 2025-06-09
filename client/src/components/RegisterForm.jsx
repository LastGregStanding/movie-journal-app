import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const RegisterForm = () => {
  const { setActiveModal } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
        "http://localhost:5150/api/auth/register-user",
        formData
      );
      console.log("Register successful:", response);
      // Optionally reset the form or redirect the user
    } catch (error) {
      console.error("Error during registering:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content login-register-container">
        <FontAwesomeIcon
          className="icon exit-btn"
          onClick={() => setActiveModal("")}
          icon={faX}
        />
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-input-container">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
