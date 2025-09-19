import axios from "axios";
import { API_KEY, BASE_URL } from "../constants/config";
import { store } from "../redux/store";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "Application/json",
    "x-api-key": API_KEY,
    lang: "vi",
  },
});

export const axiosInstance2 = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "Application/json",
    "x-api-key": API_KEY,
    lang: "vi",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log("Invalid Token!!!:::", error);
    return Promise.reject(error);
  }
);

axiosInstance2.interceptors.response.use((response) => response.data);

axiosInstance.interceptors.request.use(async (config) => {
  const token = store.getState()?.authLogin.accessToken;
  const userId = store.getState()?.authLogin.userInfo._id;
  if (token) {
    try {
      if (config.headers) {
        (config.headers as Record<string, string>)["authorization"] = token;
        (config.headers as Record<string, string>)["x-user-id"] = userId;
      }
    } catch (e) {
      console.log(e);
    }
  }
  try {
    if (config.headers) {
      (config.headers as Record<string, string>)["x-api-key"] = API_KEY;
    }
  } catch (err) {
    console.log(err);
  }
  return {
    ...config,
  };
});

export default axiosInstance;
