import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UserReducer } from "../../types/user";
import { fetchAllUsers, authCredential, loginUser } from "./userReducer";


const cartSlice = createSlice({
  name: "userSlice",
  initialState: { userList: [] } as UserReducer,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        console.log("fetch-all-user")
        if (action.payload instanceof AxiosError || !action.payload) return state;
        else {
          state.userList = action.payload;
        }
      })

      .addCase(authCredential.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError || !action.payload) return state;
        else state.session = action.payload;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError || !action.payload) return state;
        else state.currentUser = action.payload
      })
  },
});

export const cartReducer = cartSlice.reducer;
