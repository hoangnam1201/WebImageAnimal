import { Button, CircularProgress, Input, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import { userApi } from "../../api/userApi";

import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onChange" });

  const [registerState, setRegisterState] = useState({ status: 0, err: "" });
  const navigate = useNavigate();

  const registerHandler = async (data) => {
    //validators
    setRegisterState({ status: 1 });
    try {
      await userApi.register({ ...data, confirmationPassword: undefined });
      setRegisterState({ status: 0 });
      Swal.fire({
        icon: "success",
        title: "Register successful !!!",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        navigate("/auth/login", {
          state: { msg: "Register success", status: 0 },
        });
      });
    } catch (e) {
      if (e.response) {
        setRegisterState({
          status: -1,
          err: e.response.data.message[0],
        });
      }
    }
  };

  const handleRegisterKey = (e) => {
    if (e.key === "Enter") {
      handleSubmit(registerHandler)();
    }
  };

  return (
    <div className="top-0 absolute w-full flex justify-center items-center py-40 bg-bg-login text-white bg-cover bg-center">
      <div className="flex flex-col justify-center items-center w-1/3 border-2 rounded-xl bg-slate-600 bg-opacity-50">
        <img width={200} height={200} src={Logo} alt="logo" className="py-3" />
        <h2 className="text-3xl font-bold py-4">Sign up account</h2>
        <form
          onKeyDown={handleRegisterKey}
          className="flex flex-col items-center justify-center w-full px-4"
        >
          <div className="w-5/6 mt-3">
            <div className="flex justify-between">
              <p>Username</p>
              {errors.username?.type === "required" && (
                <p className="text-white p-1 rounded-sm text-xs bg-red-500">
                  required
                </p>
              )}
              {errors.username?.type === "minLength" && (
                <p className="text-white p-1 rounded-sm text-xs bg-red-500">
                  minLength is 5
                </p>
              )}
            </div>
            <TextField
              fullWidth
              margin="none"
              {...register("username", {
                required: "required",
                minLength: "5",
              })}
              name="username"
              error={!!errors.username}
              sx={{ bgcolor: "white" }}
            />
          </div>
          <div className="w-5/6 mt-3">
            <div className="flex justify-between">
              <p>Email</p>
              {errors.email?.type === "required" && (
                <p className="text-white p-1 rounded-sm text-xs bg-red-500">
                  required
                </p>
              )}
            </div>
            <TextField
              sx={{ bgcolor: "white" }}
              fullWidth
              margin="none"
              {...register("email", { required: "required" })}
              name="email"
              type="email"
              error={!!errors.email}
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
              {errors.password?.type === "minLength" && (
                <p className="text-white p-1 rounded-sm text-xs bg-red-500">
                  minLength is 6
                </p>
              )}
            </div>
            <TextField
              fullWidth
              margin="none"
              sx={{ bgcolor: "white" }}
              {...register("password", { required: "required", minLength: 6 })}
              name="password"
              type="password"
              error={!!errors.password}
            />
          </div>
          <div className="w-5/6 mt-3">
            <div className="flex justify-between">
              <p>Confirmation Password</p>
              {errors.confirmationPassword?.type === "required" && (
                <p className="text-white p-1 rounded-sm text-xs bg-red-500">
                  required
                </p>
              )}
              {errors.confirmationPassword?.type === "equalPassword" && (
                <p className="text-white p-1 rounded-sm text-xs bg-red-500">
                  invalid
                </p>
              )}
            </div>
            <TextField
              fullWidth
              margin="none"
              sx={{ bgcolor: "white" }}
              {...register("confirmationPassword", {
                required: "required",
                validate: {
                  equalPassword: (v) => v === getValues("password"),
                },
              })}
              name="confirmationPassword"
              type="password"
              error={!!errors.password}
            />
          </div>
        </form>
        <div className="text-center text-red-400 font-semibold">
          {registerState.status === -1 && registerState.err}
        </div>
        <Button
          onClick={handleSubmit(registerHandler)}
          variant="contained"
          color="primary"
          className="w-1/2 my-5 py-3"
          disabled={registerState.status === 1}
        >
          {registerState.status === 1 && <CircularProgress />}
          {registerState.status !== 1 && "Sign up"}
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;
