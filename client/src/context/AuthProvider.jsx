import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");

  // Refresh function to call after user logs in or logs out
  const refreshUser = () => {
    axios
      .get("http://localhost:5150/api/auth/me", { withCredentials: true })
      .then((res) => {
        setUsername(res.data.user.username);
        setLoggedIn(true);
      })
      .catch(() => {
        setLoggedIn(false);
        setUsername(null);
      });
  };

  // Load the user on the first mount
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        username,
        refreshUser,
        activeModal,
        setActiveModal,
        selectedMovie,
        setSelectedMovie,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
