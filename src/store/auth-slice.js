import { createSlice } from "@reduxjs/toolkit";
import endPoint from "../services/endPoint";
const baseUrl = endPoint.imgEndPoint;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),
    partnerId: localStorage.getItem("partnerId"),
    userId: localStorage.getItem("userId"),
    userType: localStorage.getItem("userType"),
    userUserName: localStorage.getItem("userUserName"),
    userName: localStorage.getItem("userName"),
    userEmail: localStorage.getItem("userEmail"),
    userPhone: localStorage.getItem("userPhone"),
    userPhoto: localStorage.getItem("userPhoto"),
    countryEn: localStorage.getItem("countryEn"),
    countryAr: localStorage.getItem("countryAr"),
  },
  reducers: {
    login(state, action) {
      localStorage.setItem("access", action.payload.access);
      localStorage.setItem("refresh", action.payload.refresh);
      localStorage.setItem("partnerId", action.payload.partnerId);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("userType", action.payload.userType);
      localStorage.setItem("userUserName", action.payload.userUserName);
      localStorage.setItem("userName", action.payload.userName);
      localStorage.setItem("userEmail", action.payload.userEmail);
      localStorage.setItem("userPhoto", baseUrl + action.payload.userPhoto);
      localStorage.setItem("userPhone", action.payload.userPhone);
      localStorage.setItem("countryEn", action.payload.countryEn);
      localStorage.setItem("countryAr", action.payload.countryAr);

      state.access = localStorage.getItem("access");
      state.refresh = localStorage.getItem("refresh");
      state.partnerId = localStorage.getItem("partnerId");
      state.userId = localStorage.getItem("userId");
      state.userType = localStorage.getItem("userType");
      state.userUserName = localStorage.getItem("userUserName");
      state.userName = localStorage.getItem("userName");
      state.userEmail = localStorage.getItem("userEmail");
      state.userPhone = localStorage.getItem("userPhone");
      state.userPhoto = localStorage.getItem("userPhoto");
      state.countryEn = localStorage.getItem("countryEn");
      state.countryAr = localStorage.getItem("countryAr");
    },
    setPartnerClient(state, action) {
      localStorage.setItem("partnerId", action.payload.partnerId);
      state.partnerId = localStorage.getItem("partnerId");
    },

    logout(state) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("partnerId");
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
      localStorage.removeItem("userUserName");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userPhone");
      localStorage.removeItem("userPhoto");
      localStorage.removeItem("countryEn");
      localStorage.removeItem("countryAr");

      state.access = localStorage.getItem("access");
      state.refresh = localStorage.getItem("refresh");
      state.partnerId = localStorage.getItem("partnerId");
      state.userId = localStorage.getItem("userId");
      state.userType = localStorage.getItem("userType");
      state.userUserName = localStorage.getItem("userUserName");
      state.userName = localStorage.getItem("userName");
      state.userEmail = localStorage.getItem("userEmail");
      state.userPhone = localStorage.getItem("userPhone");
      state.userPhoto = localStorage.getItem("userPhoto");
      state.countryEn = localStorage.getItem("countryEn");
      state.countryAr = localStorage.getItem("countryAr");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
