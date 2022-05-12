import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import Image1 from "../../Assets/image1.jpg";
import Image2 from "../../Assets/image2.jpg";
import Image3 from "../../Assets/image3.jpg";
import Image4 from "../../Assets/image4.jpg";
import Image5 from "../../Assets/image5.jpg";
import Image6 from "../../Assets/image6.jpg";
import Image7 from "../../Assets/image7.jpg";
import Image8 from "../../Assets/image8.jpg";
import Image9 from "../../Assets/image9.jpg";
import Image10 from "../../Assets/image10.jpg";
import { IconButton } from "@mui/material";

const GalleryImage = () => {
  return (
    <div className="gap-4 columns-4 px-4 py-10">
      <div className="group relative">
        <img className="pt-2 group-hover:scale-105" src={Image1} alt="img1" />
        <IconButton
          className="absolute text-xs w-auto bg-green-600 top-3/4 left-3/4 transform translate-x-8 translate-y-5 z-30 hidden opacity-0 transition-all group-hover:block group-hover:opacity-100"
          variant="contained"
        >
          <DownloadIcon />
        </IconButton>
      </div>
      <div className="group relative">
        <img className="pt-2 group-hover:scale-105" src={Image2} alt="img2" />
        <IconButton
          className="absolute text-xs w-auto bg-green-600 top-3/4 left-3/4 transform translate-x-8 translate-y-5 z-30 hidden opacity-0 transition-all group-hover:block group-hover:opacity-100"
          variant="contained"
        >
          <DownloadIcon />
        </IconButton>
      </div>
      <div className="group relative">
        <img className="pt-2 group-hover:scale-105" src={Image3} alt="img3" />
        <IconButton
          className="absolute text-xs w-auto bg-green-600 top-3/4 left-3/4 transform translate-x-8 translate-y-5 z-30 hidden opacity-0 transition-all group-hover:block group-hover:opacity-100"
          variant="contained"
        >
          <DownloadIcon />
        </IconButton>
      </div>
      <div className="group relative">
        <img className="pt-2 group-hover:scale-105" src={Image4} alt="img4" />
        <IconButton
          className="absolute text-xs w-auto bg-green-600 top-3/4 left-3/4 transform translate-x-8 translate-y-5 z-30 hidden opacity-0 transition-all group-hover:block group-hover:opacity-100"
          variant="contained"
        >
          <DownloadIcon />
        </IconButton>
      </div>
      <div className="group relative">
        <img className="pt-2 group-hover:scale-105" src={Image5} alt="img5" />
        <IconButton
          className="absolute text-xs w-auto bg-green-600 top-3/4 left-3/4 transform translate-x-8 translate-y-5 z-30 hidden opacity-0 transition-all group-hover:block group-hover:opacity-100"
          variant="contained"
        >
          <DownloadIcon />
        </IconButton>
      </div>
      <div className="group relative">
        <img className="pt-2 group-hover:scale-105" src={Image6} alt="img6" />
        <IconButton
          className="absolute text-xs w-auto bg-green-600 top-3/4 left-3/4 transform translate-x-8 translate-y-5 z-30 hidden opacity-0 transition-all group-hover:block group-hover:opacity-100"
          variant="contained"
        >
          <DownloadIcon />
        </IconButton>
      </div>
      <div className="group relative">
        <img className="pt-2 group-hover:scale-105" src={Image7} alt="img7" />
        <IconButton
          className="absolute text-xs w-auto bg-green-600 top-3/4 left-3/4 transform translate-x-8 translate-y-5 z-30 hidden opacity-0 transition-all group-hover:block group-hover:opacity-100"
          variant="contained"
        >
          <DownloadIcon />
        </IconButton>
      </div>
      <div className="group relative">
        <img className="pt-2 group-hover:scale-105" src={Image8} alt="img8" />
        <IconButton
          className="absolute text-xs w-auto bg-green-600 top-3/4 left-3/4 transform translate-x-8 translate-y-5 z-30 hidden opacity-0 transition-all group-hover:block group-hover:opacity-100"
          variant="contained"
        >
          <DownloadIcon />
        </IconButton>
      </div>
      <div className="group relative">
        <img className="pt-2 group-hover:scale-105" src={Image9} alt="img9" />
        <IconButton
          className="absolute text-xs w-auto bg-green-600 top-3/4 left-3/4 transform translate-x-8 translate-y-5 z-30 hidden opacity-0 transition-all group-hover:block group-hover:opacity-100"
          variant="contained"
        >
          <DownloadIcon />
        </IconButton>
      </div>
      <div className="group relative">
        <img className="pt-2 group-hover:scale-105" src={Image10} alt="img10" />
        <IconButton
          className="absolute text-xs w-auto bg-green-600 top-3/4 left-3/4 transform translate-x-8 translate-y-5 z-30 hidden opacity-0 transition-all group-hover:block group-hover:opacity-100"
          variant="contained"
        >
          <DownloadIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default GalleryImage;
