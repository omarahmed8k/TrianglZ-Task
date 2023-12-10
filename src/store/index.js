import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import otpReducer from "./otp-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    otp: otpReducer,
  },
});

export default store;
