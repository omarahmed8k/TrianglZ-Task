import Axios from "./Axios";

let bookServices = {
  listAllBooks: async function () {
    const response = await Axios.get(`books`);
    return response;
  },

  CreateBook: async function (data = {}) {
    const response = await Axios.post(`books`, data);
    return response;
  },

  ReadBook: async function (id = "") {
    const response = await Axios.get(`books/${id}`);
    return response;
  },

  EditBook: async function (id = "", data = {}) {
    const response = await Axios.patch(`books/${id}`, data);
    return response;
  },

  DeleteBook: async function (id = "") {
    const response = await Axios.delete(`books/${id}`);
    return response;
  },
};

export default bookServices;
