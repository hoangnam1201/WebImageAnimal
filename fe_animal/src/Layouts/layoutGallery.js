import React from "react";
import { Outlet } from "react-router-dom";
import ReviewDialog from "../Components/dialog/reviewDialog.js";

const LayoutGallery = () => {
  return (
    <div className="min-h-screen bg-zinc-900">
      <ReviewDialog />
      <Outlet />
    </div>
  );
};

export default LayoutGallery;
