import Axios from "./Axios";

let userServices = {
  getUser: async function (userId) {
    const response = await Axios.get(`v1/users/${userId}`);
    return response;
  },
  editUser: async function (userId, obj) {
    const response = await Axios.patch(`v1/users/${userId}`, obj);
    return response;
  },
  deleteUser: async function (userId) {
    const response = await Axios.delete(`v1/users/${userId}`);
    return response;
  },
  createUser: async function (obj) {
    const response = await Axios.post(`v1/users`, obj);
    return response;
  },
  getUsers: async function (page, searchTerm = "") {
    const response = await Axios.get(
      `v1/users?page=${page}&q=${searchTerm}`
    );
    return response;
  },
  removeUserPhoto: async function () {
    const response = await Axios.patch(`v1/users/remove-profile-image`);
    return response;
  },
  listAllUsers: async function () {
    const response = await Axios.get(`v1/users`);
    return response;
  },
  listAllUserTypes: async function () {
    const response = await Axios.get(`/mapping`);
    return response;
  },
};

export default userServices;
