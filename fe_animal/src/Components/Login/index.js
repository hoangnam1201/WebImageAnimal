import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import GoogleIcon from "@mui/icons-material/Google";
import { useCookies } from "react-cookie";
import { login } from "../../api/userApi";

const LoginPage = () => {
  const [cookies, setCookies] = useCookies(["infoUser"]);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loginState, setLoginState] = useState({ status: 0, err: "" });
  const navigate = useNavigate();

  const loginHandler = async () => {
    //validators
    setLoginState({ status: 1 });
    try {
      const res = await login(loginData);
      setCookies("infoUser", JSON.stringify(res?.data));
      setLoginState({ status: 0 });
      navigate("/", {
        state: { msg: "Login success", status: 0 },
      });
    } catch (e) {
      if (e.response) {
        setLoginState({
          status: -1,
          err: e.response.data.error,
        });
      }
    }
  };
  return (
    <div className="top-0 absolute w-full flex justify-center items-center py-40 bg-bg-login text-white bg-cover bg-center">
      <div className="flex flex-col justify-center items-center w-1/3 border-2 rounded-xl bg-slate-600 bg-opacity-50">
        <img width={200} height={200} src={Logo} alt="logo" className="py-3" />
        <h2 className="text-3xl font-bold py-4">Contributor Login</h2>
        <TextField
          label="Email"
          name="email"
          type="email"
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          className="w-5/6 bg-white"
        />
        <TextField
          label="Password"
          type="password"
          name="passowrd"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          className="w-5/6 mt-3 bg-white"
        />
        <div className="text-center text-red-400 font-semibold">
          {loginState.status === -1 && loginState.err}
        </div>
        <Button
          onClick={loginHandler}
          variant="contained"
          color="primary"
          className="w-1/2 mt-3"
        >
          Log In
        </Button>
        <Link
          className="my-4 border-b-2 w-5/6 flex justify-center"
          to="/register"
        >
          Forgot your password?
        </Link>

        <Button
          startIcon={<GoogleIcon />}
          className="mb-5"
          variant="contained"
          color="error"
        >
          Login with google account
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
