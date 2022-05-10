import React from "react";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HomePage from "../Components/HomePage";

const LayoutHome = () => {
  return (
    <>
      <Header />
      <Banner />
      <HomePage />
      <Footer />
    </>
  );
};

export default LayoutHome;
