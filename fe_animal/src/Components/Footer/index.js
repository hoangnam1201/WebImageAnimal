import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <div className="flex flex-col text-white bg-black">
      <div className="py-5 border-b-2">
        <Link className="text-xl mx-3" to="/">
          Careers
        </Link>
        <Link className="text-xl mx-3" to="/">
          Free Photos Terms
        </Link>
        <Link className="text-xl mx-3" to="/">
          Privacy
        </Link>
        <Link className="text-xl mx-3" to="/">
          About Us
        </Link>
      </div>
      <div className="flex justify-between px-5 border-b-2 py-10">
        <div className="flex flex-col">
          <Link className="font-bold" to="/">
            Resources
          </Link>
          <Link to="/">Free stock photos</Link>
          <Link to="/">Browser Free Images Collections</Link>
        </div>
        <div className="flex flex-col">
          <Link className="font-bold" to="/">
            Popular Collections
          </Link>
          <Link to="/">Business Images</Link>
          <Link to="/">Coffee Images</Link>
          <Link to="/">Office Pictures</Link>
          <Link to="/">Sports Images</Link>
          <Link to="/">Baby Photos</Link>
          <Link to="/">Womens Images</Link>
        </div>
        <div className="flex flex-col">
          <Link className="font-bold" to="/">
            Resources
          </Link>
          <Link to="/">Free stock photos</Link>
          <Link to="/">Browser Free Images Collections</Link>
        </div>
        <div className="flex flex-col">
          <Link className="font-bold" to="/">
            Resources
          </Link>
          <Link to="/">Free stock photos</Link>
          <Link to="/">Browser Free Images Collections</Link>
        </div>
      </div>
      <div className="flex px-10">
        <h2>Powered by Student UTE</h2>
        <div className="ml-32">
          <FacebookIcon className="ml-3" fontSize="large" />
          <InstagramIcon className="ml-3" fontSize="large" />
          <YouTubeIcon className="ml-3" fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
