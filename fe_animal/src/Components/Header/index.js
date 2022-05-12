import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import { useCookies } from "react-cookie";

const Header = () => {
  const [cookies, _, removeCookies] = useCookies(["infoUser"]);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const logoutHandler = () => {
    removeCookies("infoUser", { path: "/" });
    navigate("/");
  };
  return (
    <nav className="flex justify-between  items-center font-400 z-10 text-gray-300 relative">
      <Link to="/" className="ml-5 pl-10">
        <img width={75} height={75} src={Logo} alt="logo" />
      </Link>
      <ul className="flex items-center border-r-2 ml-20 pl-11 border-white relative">
        <li className="mx-3 hover:bg-zinc-400">
          <button
            className="border-none flex items-center"
            onClick={() => setShowMenu(!showMenu)}
          >
            Collections
            <svg
              class="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </li>
        {showMenu && (
          <div className="absolute z-30 bg-slate-700 top-1/2 mt-8 w-auto h-auto p-3 rounded-md">
            <div className="flex justify-center grid grid-cols-3 text-white">
              <Link className="my-3 px-5 hover:bg-slate-400" to="/">
                Sport
              </Link>
              <Link className="my-3 px-5 hover:bg-slate-400" to="/">
                Food
              </Link>
              <Link className="my-3 px-5 hover:bg-slate-400" to="/">
                Fashion
              </Link>
              <Link className="my-3 px-5 hover:bg-slate-400" to="/">
                Travel
              </Link>
              <Link className="my-3 px-5 hover:bg-slate-400" to="/">
                Animal
              </Link>
              <Link className="my-3 px-5 hover:bg-slate-400" to="/">
                Film
              </Link>
              <Link className="my-3 px-5 hover:bg-slate-400" to="/">
                Technology
              </Link>
              <Link className="my-3 px-5 hover:bg-slate-400" to="/">
                Sport
              </Link>
              <Link className="my-3 px-5 hover:bg-slate-400" to="/">
                Sport
              </Link>
            </div>
          </div>
        )}
        <li className="mx-3 hover:bg-zinc-400">
          <Link to="/photos">All photos</Link>
        </li>
        <li className="mx-3 hover:bg-zinc-400">
          <Link to="/">Business Ideas</Link>
        </li>
        <li className="mx-3 hover:bg-zinc-400">
          <Link to="/">Resources</Link>
        </li>
      </ul>
      {cookies.infoUser ? (
        <div className="flex px-4 mr-10">
          <h2 className="font-bold text-xl text-white">
            Hi, {cookies.infoUser.user.username}
          </h2>
          <Button
            onClick={logoutHandler}
            className="ml-3 border-white text-white"
            variant="outlined"
          >
            Đăng xuất
          </Button>
        </div>
      ) : (
        <div className="px-4 mr-10">
          <Link to="/auth/register">
            <Button
              variant="outlined"
              style={{
                color: "white",
                borderColor: "white",
                marginRight: "10px",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              Become a contributor
            </Button>
          </Link>
          <Link to="/auth/login">
            <Button
              variant="contained"
              style={{ borderRadius: "10px", fontWeight: "bold" }}
              color="success"
            >
              Login
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};
export default Header;
