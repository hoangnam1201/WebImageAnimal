import axios from "axios";
import { Cookies } from "react-cookie";

export const baseURL = process.env.baseURL || "http://localhost:3001/";

const instance = axios.create({ baseURL });

instance.interceptors.request.use((config) => {
  const auth = new Cookies().get("infoUser");
  if (auth) {
    config.headers["Authorization"] = `Bearer ${auth.token}`;
    return config;
  }
  return config;
});

export default instance;
