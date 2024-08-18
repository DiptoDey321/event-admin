import { getLocalStorage } from "@/utils/localStorage";
import axios from "axios"

const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json"
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 120000;

instance.interceptors.request.use(
  function (config) {
    const accessToken = getLocalStorage("access_token");
   if (accessToken && config.headers.requiresAuth) {
     config.headers.Authorization = `Bearer ${accessToken}`;
   }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    const responseObject:any = {
        data : response?.data,
    }
    return responseObject;
  },
  function (error) {
    return Promise.reject(error);
  }
);


export { instance };