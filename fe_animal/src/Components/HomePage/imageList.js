import { Button } from "@mui/material";
import React from "react";
import Img1 from "../../Assets/food.jpg";
import Img2 from "../../Assets/sports.jpg";
import Img3 from "../../Assets/music.jpg";
import Img4 from "../../Assets/coffee.jpg";
import Img5 from "../../Assets/animal.jpg";
import Img6 from "../../Assets/technology.jpg";
const ImageList = () => {
  let data = [
    {
      id: 1,
      imgSrc: Img1,
      name: "Food",
    },
    {
      id: 1,
      imgSrc: Img2,
      name: "Sports",
    },
    {
      id: 1,
      imgSrc: Img3,
      name: "Music",
    },
    {
      id: 1,
      imgSrc: Img4,
      name: "Coffee",
    },
    {
      id: 1,
      imgSrc: Img5,
      name: "Animal",
    },
    {
      id: 1,
      imgSrc: Img6,
      name: "Technology",
    },
  ];
  return (
    <div className="text-white bg-black py-12">
      <div className="flex justify-between mx-16 items-center">
        <div>
          <h2 className="font-bold text-4xl mb-4">
            Browse high-resolution photo collections
          </h2>
          <h4>Browse high-resolution photo collections</h4>
        </div>
        <Button
          style={{ color: "white", borderColor: "white", height: "50px" }}
          variant="outlined"
        >
          View all collections
        </Button>
      </div>
      <div className="gap-4 columns-4 px-10 mt-7">
        {data.map((item, index) => {
          return (
            <div className="pt-3 relative" key={index}>
              <img src={item.imgSrc} className="w-full" />
              <h2 className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-shadow-lg">
                {item.name}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageList;
