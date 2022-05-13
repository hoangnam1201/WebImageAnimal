import { Button, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image1 from "../../Assets/image1.jpg";
import Image2 from "../../Assets/image2.jpg";
import Image3 from "../../Assets/image3.jpg";
import Image4 from "../../Assets/image4.jpg";
import Image5 from "../../Assets/image5.jpg";

const CarouselTag = () => {
  return (
    <div>
      <div className="flex justify-between items-center py-16 px-10">
        <div className="text-white">
          <h2 className="text-3xl font-bold">Download new HD photos</h2>
          <h3 className="text-lg w-3/4">
            New high definition photos are being added every week! These public
            domain images are free to use for personal or commercial purposes.
          </h3>
        </div>
        <div>
          <TextField
            label="Search photos"
            variant="outlined"
            className="bg-white text-gray-500"
          />
          <Button
            startIcon={<SearchIcon />}
            variant="contained"
            color="success"
            className="h-14 w-28"
          >
            Search
          </Button>
        </div>
      </div>
      <div className="px-4">
        <Swiper
          className="h-14 bg-black"
          modules={[Navigation]}
          spaceBetween={-500}
          slidesPerView={6}
          navigation
        >
          <SwiperSlide>
            <div className="w-32 h-12 relative">
              <img src={Image1} alt="image1" />
              <h2 className="text-white font-bold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-shadow-lg">
                Travel
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-32 h-12 relative">
              <img src={Image2} alt="image2" />
              <h2 className="text-white font-bold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-shadow-lg">
                Sports
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-32 h-12 relative">
              <img src={Image3} alt="image3" />
              <h2 className="text-white font-bold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-shadow-lg">
                Technology
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-32 h-12 relative">
              <img src={Image4} alt="image4" />
              <h2 className="text-white font-bold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-shadow-lg">
                Animal
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-32 h-12 relative">
              <img src={Image5} alt="image5" />
              <h2 className="text-white font-bold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-shadow-lg">
                Coffee
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-32 h-12 relative">
              <img src={Image1} alt="image1" />
              <h2 className="text-white font-bold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-shadow-lg">
                Coffee
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-32 h-12 relative">
              <img src={Image1} alt="image1" />
              <h2 className="text-white font-bold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-shadow-lg">
                Coffee
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-32 h-12 relative">
              <img src={Image1} alt="image1" />
              <h2 className="text-white font-bold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-shadow-lg">
                Coffee
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-32 h-12 relative">
              <img src={Image5} alt="image5" />
              <h2 className="text-white font-bold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-shadow-lg">
                Coffee
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-32 h-12 relative">
              <img src={Image5} alt="image5" />
              <h2 className="text-white font-bold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-shadow-lg">
                Coffee
              </h2>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default CarouselTag;
