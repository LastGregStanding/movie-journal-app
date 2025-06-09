import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import AddMovieForm from "../components/AddMovieForm";
import ReviewModal from "./ReviewModal";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const ActiveModal = () => {
  const { activeModal } = useContext(AuthContext);

  return (
    <>
      {activeModal === "login" && <LoginForm />}
      {activeModal === "register" && <RegisterForm />}
      {activeModal === "add-movie" && <AddMovieForm />}
      {activeModal === "review" && <ReviewModal />}
    </>
  );
};

export default ActiveModal;
