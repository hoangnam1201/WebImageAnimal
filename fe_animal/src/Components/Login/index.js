import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import GoogleIcon from "@mui/icons-material/Google";
import { useCookies } from "react-cookie";
import { login, userApi } from "../../api/userApi";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const [cookies, setCookies] = useCookies(["infoUser"]);
  const [loginState, setLoginState] = useState({ status: 0, err: "" });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const loginHandler = async (data) => {
    //validators
    setLoginState({ status: 1 });
    try {
      const res = await userApi.login(data);
      setCookies("infoUser", JSON.stringify(res?.data), { path: "/" });
      setLoginState({ status: 0 });
      Swal.fire({
        icon: "success",
        title: "Login successful !!!",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        navigate("/", {
          state: { msg: "Login success", status: 0 },
        });
      });
    } catch (e) {
      if (e.response) {
        if (e.response.status === 403 || e.response.status === 401)
          setLoginState({
            status: -1,
            err: "Invalid email or password",
          });
      }
    }
  };

  const handleLoginKey = (e) => {
    if (e.key === "Enter") {
      handleSubmit(loginHandler)();
    }
  };
  return (
    <div className="top-0 absolute w-full flex justify-center items-center py-40 bg-bg-login text-white bg-cover bg-center">
      <div className="flex flex-col justify-center items-center w-1/3 border-2 rounded-xl bg-slate-600 bg-opacity-50">
        <img width={200} height={200} src={Logo} alt="logo" className="py-3" />
        <h2 className="text-3xl font-bold py-4">Contributor Login</h2>
        <form
          onKeyDown={handleLoginKey}
          className="flex flex-col w-5/6 justify-center items-center"
        >
          <div className="w-5/6 mt-3">
            <div className="flex justify-between">
              <p>Email</p>
              {errors.email?.type === "required" && (
                <p className="text-white p-1 rounded-sm text-xs bg-red-500">
                  required
                </p>
              )}
              {errors.email?.type === "minLength" && (
                <p className="text-white p-1 rounded-sm text-xs bg-red-500">
                  minLength is 5
                </p>
              )}
            </div>
            <TextField
              fullWidth
              margin="none"
              {...register("email", {
                required: "required",
              })}
              name="email"
              error={!!errors.email}
              sx={{ bgcolor: "white" }}
            />
          </div>
          <div className="w-5/6 mt-3">
            <div className="flex justify-between">
              <p>Password</p>
              {errors.password?.type === "required" && (
                <p className="text-white p-1 rounded-sm text-xs bg-red-500">
                  required
                </p>
              )}
            </div>
            <TextField
              sx={{ bgcolor: "white" }}
              fullWidth
              margin="none"
              {...register("password", { required: "required" })}
              name="password"
              type="password"
              error={!!errors.password}
            />
          </div>
        </form>
        <div className="text-center text-red-400 font-semibold">
          {loginState.status === -1 && loginState.err}
        </div>
        <Button
          onClick={handleSubmit(loginHandler)}
          onKeyDown={handleLoginKey}
          variant="contained"
          color="primary"
          className="w-1/2 mt-3"
          disabled={loginState.status === 1}
        >
          {loginState.status === 1 && <CircularProgress />}
          {loginState.status !== 1 && "Log in"}
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
