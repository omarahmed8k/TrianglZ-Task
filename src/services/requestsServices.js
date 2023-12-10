import Axios from "./Axios";

let requestsServices = {
  getRequest: async function (requestId) {
    const response = await Axios.get(`v1/requests/${requestId}`);
    return response;
  },
  getRequestPrice: async function (requestId) {
    const response = await Axios.get(`v1/requests/${requestId}/price`);
    return response;
  },
  editRequest: async function (requestId, obj) {
    const response = await Axios.patch(`v1/requests/${requestId}`, obj);
    return response;
  },
  deleteRequest: async function (requestId) {
    const response = await Axios.delete(`v1/requests/${requestId}`);
    return response;
  },
  createRequest: async function (obj) {
    const response = await Axios.post(`v1/requests`, obj);
    return response;
  },
  getRequests: async function (userId = "", statusId = "", searchTerm = "", fromDate = "", toDate = "", page = 1, paid = false, partnerClient = "") {
    const response = await Axios.get(
      `v1/requests?user=${userId}&page=${page}&q=${searchTerm}&status=${statusId}&from_date=${fromDate}&to_date=${toDate}&paid=${paid}&partner_client=${partnerClient}`
    );
    return response;
  },
  listAllRequests: async function () {
    const response = await Axios.get(`v1/requests`);
    return response;
  },
  payRequest: async function (requestId) {
    const response = await Axios.patch(`v1/requests/${requestId}/payment`);
    return response;
  }
};

export default requestsServices;
