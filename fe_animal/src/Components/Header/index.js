import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import { useCookies } from "react-cookie";

const Header = () => {
  const [cookies, _, removeCookies] = useCookies(["infoUser"]);
  const navigate = useNavigate();

  const logoutHandler = () => {
    removeCookies("infoUser", { path: "/" });
    navigate("/");
  };

  return (
    <nav className="relative shadow-md z-10 grow-0">
      <div className="w-full h-full absolute bg-black opacity-50 top-0 left-0" />
      <div className="flex justify-between  items-center font-400 text-gray-200 relative z-0">
        <Link to="/" className="ml-5 pl-10">
          <img width={75} height={75} src={Logo} alt="logo" />
        </Link>
        <div className="flex justify-end">
          <ul className="flex items-center border-r-2 ml-20 pl-11 border-zinc-400 relative">
            <li className="mx-3 hover:text-zinc-400">
              <Link to="/photos">All photos</Link>
            </li>
            <li className="mx-3 hover:text-zinc-400">
              <Link to="/">Business Ideas</Link>
            </li>
            <li className="mx-3 hover:text-zinc-400">
              <Link to="/upload">Upload</Link>
            </li>
          </ul>
          {cookies.infoUser ? (
            <div className="flex px-4 mr-10 items-center gap-2">
              <h2 className="font-bold text-xl text-white">
                Hi, {cookies.infoUser.user.username}
              </h2>
              <div className="bg-gray-200 rounded-full group hover:bg-white relative">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700 shadow-sm group-hover:text-blue-700
                group-hover:transform group-hover:rotate-180 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <div className="absolute top-full right-0 whitespace-nowrap p-1 hidden group-hover:block">
                  <div className="bg-gray-200 text-gray-600 p-3 rounded shadow flex flex-col">
                    {cookies.infoUser.user.role === "USER" ? (
                      <Link to="/my-pictures">
                        <button className="p-2 text-center hover:shadow-lg shadow rounded">
                          My Pictures
                        </button>
                      </Link>
                    ) : (
                      <Link to="/admin">
                        <button className="p-2 text-center hover:shadow-lg shadow rounded">
                          Management
                        </button>
                      </Link>
                    )}
                    <button
                      className="p-2 text-center hover:shadow-lg shadow rounded"
                      onClick={logoutHandler}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-4 mr-10">
              <Link to="/auth/register">
                <Button
                  variant="outlined"
                  style={{
                    color: "#e5e7eb",
                    borderColor: "#e5e7eb",
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
        </div>
      </div>
    </nav>
  );
};
export default Header;
