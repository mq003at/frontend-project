import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../../test/shared/sharedInstance";
import { Product } from "../../types/common";
import { AccountCredential, SessionCredential, User, UserReducer } from "../../types/user";

// Fetch all users from API
export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  try {
    const res: AxiosResponse<User[] | Error, any> = await axiosInstance.get("users");
    if (!(res.data instanceof Error)) return res.data;
  } catch (e) {
    return;
  }
});

// User Auth
export const authCredential = createAsyncThunk("authCredential", async (account: AccountCredential) => {
  try {
    const res: AxiosResponse<SessionCredential | Error, any> = await axiosInstance.post("auth/login", account);
    if (!(res.data instanceof Error)) return res.data;
  } catch (e) {
    const error = e as AxiosError;
    return error;
  }
});

// LOGIN & Get user's profile
export const loginUser = createAsyncThunk("loginUser", async (access_token: string) => {
  try {
    const res: AxiosResponse<User | Error, any> = await axiosInstance.get("auth/profile", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (!(res.data instanceof Error)) return res.data;
  } catch (e) {
    const error = e as AxiosError;
    return error;
  }
});

const userSlice = createSlice({
  name: "userSlice",
  initialState: { userList: [], specialOffers: undefined } as UserReducer,
  reducers: {
    makeSpecialOffersForUser: (state, action) => {
      // Randomize special offers
      if (!state.specialOffers && action.payload.length > 0) {
        const allProducts = action.payload;
        let tempArray: Product[] = [];
        let randomIndex: number[] = [];
        for (let i = 0; i < 5; i++) {
          let rI = Math.floor(Math.random() * 200);
          randomIndex.push(rI);
        }
        randomIndex.forEach((index) => tempArray.push(allProducts[index]));
        return {...state, specialOffers: tempArray}
      }
      return state;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        console.log("fetch-all-user");
        if (action.payload instanceof AxiosError || !action.payload) return state;
        else {
          return { ...state, userList: action.payload };
        }
      })

      .addCase(authCredential.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError || !action.payload || !state) return state;
        else return { ...state, session: action.payload };
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError || !action.payload || !state) return state;
        else return { ...state, currentUser: action.payload };
      });
  },
});

export const userReducer = userSlice.reducer;
export const { makeSpecialOffersForUser } = userSlice.actions;
