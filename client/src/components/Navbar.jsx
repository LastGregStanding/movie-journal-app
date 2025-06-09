import axios from "axios";
import NavbarButton from "./NavbarButton";
import NavbarLogo from "./NavbarLogo";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const Navbar = () => {
  const { loggedIn, setLoggedIn, setActiveModal } = useContext(AuthContext);
  const handleLogoutClick = async () => {
    try {
      await axios.post("http://localhost:5150/api/auth/logout", null, {
        withCredentials: true,
      });
      setLoggedIn(false);
      setActiveModal("demo");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="navbar-main-container">
      <NavbarLogo />
      <nav className="navbar">
        {!loggedIn && (
          <>
            <NavbarButton onClick={() => setActiveModal("login")}>
              Login
            </NavbarButton>
            <NavbarButton onClick={() => setActiveModal("register")}>
              Register
            </NavbarButton>
          </>
        )}

        {loggedIn && (
          <>
            <NavbarButton onClick={() => setActiveModal("add-movie")}>
              Add Movie
            </NavbarButton>
            <NavbarButton>Organize By</NavbarButton>
            <NavbarButton>Search Library</NavbarButton>
            <NavbarButton onClick={handleLogoutClick}>Logout</NavbarButton>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
