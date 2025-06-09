import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ActiveModal from "../components/ActiveModal";
import UserMovieLibrary from "../components/UserMovieLibrary";
import DemoPage from "../components/DemoPage";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const HomePage = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      {loggedIn ? <UserMovieLibrary /> : <DemoPage />}
      <ActiveModal />
      <Footer />
    </div>
  );
};

export default HomePage;
