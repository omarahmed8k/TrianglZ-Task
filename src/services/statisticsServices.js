import Axios from "./Axios";

let statisticsServices = {
  getUserStatistics: async function (userId = "", month = "", start_date = "", end_date = "") {
    const response = await Axios.get(
      `v1/statistics/user/${userId}?month=${month}&date_range=${start_date}${end_date ? "," + end_date : ""}`
    );
    return response;
  },

  getPartnerClientStatistics: async function (month = "", start_date = "", end_date = "") {
    const response = await Axios.get(
      `v1/requests/status-count?month=${month}&date_range=${start_date}${end_date ? "," + end_date : ""}`
    );
    return response;
  }
};

export default statisticsServices;
