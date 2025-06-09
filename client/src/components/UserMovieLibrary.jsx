import axios from "axios";
import { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import IndividualMovie from "./IndividualMovie";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const UserMovieLibrary = () => {
  const [library, setLibrary] = useState([]);
  const { activeModal } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:5150/api/library", { withCredentials: true })
      .then((res) => {
        const library = res.data[0][0];
        setLibrary(library);
        console.log("Successfully retrieved library: ", library);
      })
      .catch((err) => {
        console.error("Failed to retrieve library:", err);
      });
  }, [activeModal]);
  return (
    <>
      <div className="swiper-container">
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          modules={[Navigation]}
          navigation={true}
          loop={true}
        >
          {library.map((movie, key) => (
            <SwiperSlide>
              <IndividualMovie movie={movie} key={key} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default UserMovieLibrary;
