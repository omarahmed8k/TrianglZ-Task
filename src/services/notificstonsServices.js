import Axios from "./Axios";

let notificstonsServices = {
  getNotifications: async function (activePage = 1, isRead = false) {
    const response = await Axios.get(`v1/notifications?page=${activePage}&is_read=${isRead}`);
    return response;
  },

  deleteNotification: async function (id) {
    const response = await Axios.delete(`v1/notifications/${id}`);
    return response;
  },

  readNotification: async function (id) {
    const response = await Axios.patch(`v1/notifications/${id}/read`);
    return response;
  },

  userReadNotifications: async function () {
    const response = await Axios.get(`v1/notifications/read_notifications`);
    return response;
  },
};

export default notificstonsServices;
