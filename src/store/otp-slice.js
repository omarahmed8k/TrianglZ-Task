import { createSlice } from "@reduxjs/toolkit";

const otpSlice = createSlice({
  name: "otp",
  initialState: {
    otp: localStorage.getItem("otp") || "",
  },
  reducers: {
    setOtp(state, action) {
      localStorage.setItem("otp", action.payload);
      state.otp = localStorage.getItem("otp");
    },

    removeOtp(state) {
      localStorage.removeItem("otp");
      state.otp = "";
    }
  },
});

export const otpActions = otpSlice.actions;
export default otpSlice.reducer;
