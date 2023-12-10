import Axios from "./Axios";

let settingsServices = {
  listAllCountries: async function () {
    const response = await Axios.get(`v1/country`);
    return response;
  },

  listAllRegion: async function () {
    const response = await Axios.get(`v1/region`);
    return response;
  },

  listAllCity: async function () {
    const response = await Axios.get(`v1/city`);
    return response;
  },

  listAllNeighborhood: async function () {
    const response = await Axios.get(`v1/neighborhood`);
    return response;
  },

  listAllBuildingType: async function () {
    const response = await Axios.get(`v1/building-type`);
    return response;
  },

  listAllClassification: async function (isActive = true, hasPrice = true) {
    const response = await Axios.get(`v1/classification?is_active=${isActive}&has_price=${hasPrice}`);
    return response;
  },

  ListAllClients: async function (page = 1, is_active = "", search = "") {
    const response = await Axios.get(`v1/partner-clients/me?page=${page}&user__is_active=${is_active}&q=${search}`);
    return response;
  },

  listAllClients: async function () {
    const response = await Axios.get(`v1/partner-clients/me`);
    return response;
  },

  getClient: async function (id) {
    const response = await Axios.get(`v1/partner-clients/${id}`);
    return response;
  },

  getPartnerClient: async function (id) {
    const response = await Axios.get(`v1/partner-clients/profile/${id}`);
    return response;
  },

  AddClient: async function (obj) {
    const response = await Axios.post(`v1/partner-clients`, obj);
    return response;
  },

  EditClient: async function (id = "", obj) {
    const response = await Axios.patch(`v1/users/${id}`, obj);
    return response;
  },

  DeleteClient: async function (id) {
    const response = await Axios.delete(`v1/partner-clients/${id}`);
    return response;
  },

  DeleteClientPhoto: async function (id) {
    const response = await Axios.patch(`v1/partner-clients/${id}/remove-client-image`);
    return response;
  }
};

export default settingsServices;
