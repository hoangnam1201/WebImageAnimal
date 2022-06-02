import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative -top-20 bg-banner-header bg-cover w-full bg-center py-48 -mb-20 shadow-md">
      <div className="text-white flex flex-col pt-12 ml-11">
        <h1 className="text-4xl py-3 font-bold text-shadow-lg ">
          Relax by looking at photos and listening to music
        </h1>
        <h1 className="text-2xl py-3 font-bold text-shadow-lg ">
          Download free, high-resolution images
        </h1>
        <h3 className="text-2xl py-3 font-normal text-shadow-lg">
          Free stock photos for websites and commercial use
        </h3>
        <div className="py-3">
          <Link to="/photos" className="text-gray-600 font-bold text-2xl bg-white py-2 px-10 shadow-md hover:text-gray-400 hover:bg-slate-50 rounded-md">
            Go to all the photos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
