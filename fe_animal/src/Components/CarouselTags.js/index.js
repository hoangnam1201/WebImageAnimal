import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { tagSelector } from "../../store/selectors";
import { getTag } from "../../store/slices/tagSlice";
import { Link } from "react-router-dom";
import SearchDialog from "../dialog/searchDialog";

const CarouselTag = () => {
  const tagData = useSelector(tagSelector);
  const dispatch = useDispatch();
  const dialogRef = useRef();

  useEffect(() => {
    dispatch(getTag());
  }, []);

  return (
    <div className="xl:px-12 px-6">
      <SearchDialog
        ref={dialogRef}
        onClose={() => {
          dialogRef.current.Close();
        }}
      />
      <div className="flex justify-between items-center py-16">
        <div className="text-white">
          <h2 className="text-3xl font-bold">Download new HD photos</h2>
          <h3 className="text-lg w-3/4">
            New high definition photos are being added every week! These public
            domain images are free to use for personal or commercial purposes.
          </h3>
        </div>
        <div className="flex items-center bg-white rounded overflow-hidden min-w-max">
          <div className="h-full" onClick={() => dialogRef.current.Open()}>
            <input className=" outline-none py-2" disabled />
          </div>
          <label className="p-4" htmlFor="searchInput">
            <SearchIcon />
          </label>
        </div>
      </div>
      <div>
        <Swiper
          className="h-14 bg-zinc-900"
          modules={[Navigation]}
          spaceBetween={-500}
          slidesPerView={6}
          navigation
        >
          {tagData &&
            tagData.list.map((tag, index) => {
              return (
                <SwiperSlide key={index}>
                  <Link
                    to={`/photos`}
                    state={{
                      tagIds: [tag.id],
                      authorId: undefined,
                      message: `${tag.name} photos`,
                    }}
                  >
                    <div className="w-32 h-12 relative">
                      <img src={tag.src} alt="image1" />
                      <h2 className="text-white font-bold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-shadow-lg">
                        {tag.name}
                      </h2>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default CarouselTag;
