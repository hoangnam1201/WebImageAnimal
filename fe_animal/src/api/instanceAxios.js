import axios from "axios";
import { Cookies } from "react-cookie";
import Swal from "sweetalert2";

export const baseURL = process.env.baseURL || "https://imagebe.herokuapp.com/";

const instance = axios.create({ baseURL });
const cookies = new Cookies();

instance.interceptors.request.use((config) => {
  const auth = new Cookies().get("infoUser");
  if (auth) {
    config.headers["Authorization"] = `Bearer ${auth.token}`;
    return config;
  }
  return config;
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const status = error.response?.status;
    if (status === 401 && cookies.get("infoUser")) {
      console.log("error logout");
      cookies.remove("infoUser", { path: "/" });
      Swal.fire("Login session expired", "Please log in again", "info").then(
        () => {
          window.location = "/auth/login";
        }
      );
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
