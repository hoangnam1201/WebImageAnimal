import React from "react";
import { Outlet } from "react-router-dom";
import CarouselTag from "../Components/CarouselTags.js";
import Header from "../Components/Header";

const LayoutGallery = () => {
  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      <CarouselTag />
      <Outlet />
    </div>
  );
};

export default LayoutGallery;
