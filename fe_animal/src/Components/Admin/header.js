import { Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import { useCookies } from "react-cookie";
const Header = ({ ...rest }) => {
  const [cookies, _, removeCookies] = useCookies(["infoUser"]);
  const navigate = useNavigate();

  const logoutHandler = () => {
    removeCookies("infoUser", { path: "/" });
    navigate("/");
  };
  return (
    <nav {...rest}>
      <Link to="/" className="ml-5 pl-10">
        <img width={60} height={60} src={Logo} alt="logo" />
      </Link>
      <div className="flex px-4 mr-10">
        <h2 className="font-bold text-xl text-white px-3">
          Hi, {cookies.infoUser?.user?.username}
        </h2>
        <Button
          onClick={logoutHandler}
          className="ml-3 border-white text-white"
          variant="outlined"
        >
          Đăng xuất
        </Button>
      </div>
    </nav>
  );
};
export default Header;
