import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { pictureSelector } from "../../store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getPicutres, resetPictures } from "../../store/slices/pictureSlice";
import { Link } from "react-router-dom";

const CarouselImage = () => {
  const picData = useSelector(pictureSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getPicutres({
        filter: picData.filter,
        page: 0,
        take: picData.take,
      })
    );
    window.history.replaceState({}, document.title);
    return () => {
      dispatch(resetPictures());
    };
  }, []);
  return (
    <div className="text-white py-12 shadow-md">
      <div className="flex justify-between mx-16 items-center">
        <div>
          <h2 className="font-bold text-4xl mb-4">Top free pics this week</h2>
          <h4>Stunning stock images, perfect for blogs and websites</h4>
        </div>
        <Link to="/photos">
          <Button
            style={{ color: "white", borderColor: "white", height: "50px" }}
            variant="outlined"
          >
            More pictures
          </Button>
        </Link>
      </div>
      <div className="py-8 px-12">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={4}
          navigation
        >
          {picData &&
            picData.list.slice(0, 10).map((pic, index) => {
              return (
                <SwiperSlide key={index} className="h-full">
                  <Link to={`/photos/${pic.id}`}>
                    <img
                      src={pic.src}
                      alt="image1"
                      className="h-full pointer-events-none"
                    />
                  </Link>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default CarouselImage;
