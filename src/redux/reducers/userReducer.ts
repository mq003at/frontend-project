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

// Sign up a user 
export const addUser = createAsyncThunk("addUser", async (user: User) => {
  try {
    const res: AxiosResponse<User | Error, any> = await axiosInstance.post("users", {
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar
    });
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

// Validate emails
export const validateEmail = createAsyncThunk("validateUser", async (email: string) => {
  try {
    const res: AxiosResponse<{isAvailable: boolean} | Error, any> = await axiosInstance.post("/users/is-available", {
      email: email
    })
    console.log("response", res.data, email)
    if(!(res.data instanceof Error)) return res.data
  } catch (e) {
    const error = e as AxiosError;
    return error;
  }
})

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
    clearEmailCheck: (state) => {
      if (state.isAvailable !== undefined) {
        delete state.isAvailable
        console.log("state", state)
      }
    }
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

      .addCase(addUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError || !action.payload) return state;
        else {
          return { ...state, currentUser: action.payload };
        }
      })

      .addCase(authCredential.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError || !action.payload || !state) return state;
        else return { ...state, session: action.payload };
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError || !action.payload || !state) return state;
        else return { ...state, currentUser: action.payload };
      })

      .addCase(validateEmail.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError || !action.payload || !state) return state;
        else return { ...state, ...action.payload };
      })
  },
});

export const userReducer = userSlice.reducer;
export const { makeSpecialOffersForUser, clearEmailCheck } = userSlice.actions;
