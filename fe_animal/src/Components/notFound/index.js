import React from "react";
import { Link } from "react-router-dom";
import notFound from "../../Assets/404.png";

const NotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <img src={notFound} alt="notfound" className="w-96" />
          <div className="flex flex-col gap-4">
            <p className=" font-extrabold text-9xl">
              <span className="text-blue-500">4</span>
              <span className="text-white text-shadow-md">0</span>
              <span className="text-blue-500">4</span>
            </p>
            <p className=" text-7xl font-bold text-blue-500">Page not found</p>
            <Link
              to="/"
              className="p-4 border-2 border-blue-500 text-blue-500 block max-w-max rounded-full"
            >
              Back To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
