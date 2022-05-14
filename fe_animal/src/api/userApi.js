import instance from "./instanceAxios";

export const userApi = {
  login: (loginData) => {
    return instance.post("/auth/signin", loginData);
  },
  register: (registerData) => {
    return instance.post("/auth/signup", registerData);
  },
  get: (searchStr, page = 0, take = 10) => {
    return instance.post("/users/get", { searchStr, page, take });
  },
  find: (searchStr, take) => {
    return instance.post("/users/find", { searchStr, take });
  },
};
