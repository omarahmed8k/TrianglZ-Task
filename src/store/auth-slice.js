import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    access: localStorage.getItem("access"),
    username: localStorage.getItem("username"),
  },
  reducers: {
    login(state, action) {
      localStorage.setItem("access", action.payload.access);
      localStorage.setItem("username", action.payload.username);

      state.access = localStorage.getItem("access");
      state.username = localStorage.getItem("username");
    },

    logout(state) {
      localStorage.removeItem("access");
      localStorage.removeItem("username");

      state.access = localStorage.getItem("access");
      state.username = localStorage.getItem("username");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
