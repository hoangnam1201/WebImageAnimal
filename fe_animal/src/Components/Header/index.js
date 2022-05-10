import { Button } from "@mui/material";
import React from "react";
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
    <nav className="flex justify-between  items-center font-400 z-10 text-gray-300 relative">
      <Link to="/" className="ml-5 pl-10">
        <img width={75} height={75} src={Logo} alt="logo" />
      </Link>
      <ul className="flex items-center border-r-2 ml-20 pl-11 border-white">
        <li className="mx-3">Collections</li>
        <li className="mx-3">New photos</li>
        <li className="mx-3">Bussiness ideas</li>
        <li className="mx-3">Resources</li>
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
