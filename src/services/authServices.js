import Axios from "./Axios";

let authServices = {
  login: async function (obj) {
    const response = await Axios.post(`token`, obj);
    return response;
  },
};

export default authServices;
