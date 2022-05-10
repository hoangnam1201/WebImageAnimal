import instance from "./instanceAxios";

export const login = (loginData) => {
  return instance.post("/auth/signin", loginData);
};

export const register = (registerData) => {
  return instance.post("/auth/signup", registerData);
};
