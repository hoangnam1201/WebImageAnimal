import React from "react";
import image1 from "../../Assets/image1.jpg";
const DetailPicture = () => {
  return (
    <div>
      <div className="bg-black text-white">
        <button className="ml-5 mt-5 bg-lime-900 rounded-md w-14">
          Trở lại
        </button>
      </div>
      <div className="flex justify-center items-center bg-black text-white min-h-screen">
        <div className="w-1/4 flex flex-col pl-20">
          <h2 className="font-bold text-3xl py-10">
            Two Customized Cars Rolling Through A City Street Photo
          </h2>
          <h3>
            Photo of two customized cars on a city side street. One car is
            raised up and the other is very low.
          </h3>
          <button className="w-auto bg-green-600 h-10 my-5 rounded-md">
            Download free photo
          </button>
          <h2 className="flex font-bold py-3">
            Photo by: <p className="ml-2 underline">Daria Ronaldo</p>
          </h2>
          <h2 className="py-3">
            Featured in:{" "}
            <p className="underline">
              City, Car, Street, Transportation, Vintage, Driving
            </p>
          </h2>
          <h2>
            License:<p>Burst Some Rights Reserved</p>
          </h2>
        </div>
        <div className="w-3/4 flex justify-center items-center">
          <img className="w-3/4 h-full" src={image1} alt="img1" />
        </div>
      </div>
    </div>
  );
};

export default DetailPicture;
