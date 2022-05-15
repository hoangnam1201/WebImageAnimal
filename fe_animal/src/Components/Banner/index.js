import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Banner = () => {
  return (
    <div className="relative -top-20 bg-banner-header bg-cover w-full bg-center py-48 -mb-20 shadow-md">
      <div className="text-white flex flex-col pt-12 ml-11">
        <h3 className="text-2xl py-3 font-normal text-shadow-lg">
          Free stock photos for websites and commercial use
        </h3>
        <h1 className="text-4xl py-3 font-bold text-shadow-lg ">
          Download free, high-resolution images
        </h1>
        <div className="w-2/3">
          <TextField
            className="bg-white text-gray-500 w-1/2 rounded-md"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <h4 className="pt-10">
          Popular categories: Fall, Background, Yoga, Coffee, Food, Nature,
          Business
        </h4>
      </div>
    </div>
  );
};

export default Banner;
