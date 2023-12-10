import axios from "axios";
import endPoint from "./endPoint";

const baseURL = endPoint.endPoint;
const Axios = axios.create({ baseURL });
const token = localStorage.getItem("token");

Axios.defaults.baseURL = baseURL;

Axios.interceptors.request.use(async (req) => {
  req.headers["Accept-Language"] = localStorage.getItem("i18nextLng") || "en";
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

Axios.interceptors.response.use(
  (response) => { return response },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        return Promise.reject("you are unautherised");
      }
      if (error.response.status === 403) {
        return Promise.reject("you are unautherised");
      }
      if (error.response.status === 404) {
        return Promise.reject("not found");
      }
      if (error.response.status === 500) {
        return Promise.reject("internal server error");
      }
    }
    return Promise.reject(error);
  }
);

export default Axios;
