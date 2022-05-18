import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, userApi } from "../../api/userApi";
import Logo from "../../Assets/logo.png";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [registerState, setRegisterState] = useState({ status: 0, err: "" });
  const navigate = useNavigate();

  const registerHandler = async () => {
    //validators
    setRegisterState({ status: 1 });
    try {
      await userApi.register(registerData);
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
          err: e.response.data.error,
        });
      }
    }
  };
  const handleRegisterKey = (e) => {
    if (e.key === "Enter") {
      registerHandler();
    }
  };
  return (
    <div className="top-0 absolute w-full flex justify-center items-center py-40 bg-bg-login text-white bg-cover bg-center">
      <div className="flex flex-col justify-center items-center w-1/3 border-2 rounded-xl bg-slate-600 bg-opacity-50">
        <img width={200} height={200} src={Logo} alt="logo" className="py-3" />
        <h2 className="text-3xl font-bold py-4">Sign up account</h2>
        <form
          onKeyDown={handleRegisterKey}
          className="flex flex-col items-center justify-center w-5/6"
        >
          <TextField
            name="username"
            onChange={(e) =>
              setRegisterData({ ...registerData, username: e.target.value })
            }
            label="Username"
            className="w-5/6 mt-3 bg-white"
          />
          <TextField
            name="email"
            type="email"
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
            label="Email"
            className="w-5/6 bg-white mt-3"
          />
          <TextField
            name="password"
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
            type="password"
            label="Password"
            className="w-5/6 mt-3 bg-white"
          />
        </form>
        <div className="text-center text-red-400 font-semibold">
          {registerState.status === -1 && registerState.err}
        </div>
        <Button
          onClick={registerHandler}
          onKeyDown={handleRegisterKey}
          variant="contained"
          color="primary"
          className="w-1/2 my-3"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;
