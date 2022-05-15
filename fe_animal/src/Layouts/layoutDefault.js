import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const LayoutDefault = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <div className="grow min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LayoutDefault;
