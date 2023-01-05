import { red } from "@mui/material/colors";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import {Category} from "../../types/common"

const fetchAllCategories = createAsyncThunk("fetchAllCategory", async () => {
    try {
        const res: AxiosResponse<Category[] | Error, any> = await axios.get("https://api.escuelajs.co/api/v1/categories")
        return {data: res.data, status: res.request.status}
    } catch (e) {console.log("fetcherr", e)}
})

const categorySlice = createSlice({
    name: "categorySlice",
    initialState: [] as Category[],
    reducers: {

    },
    extraReducers: (build) => {
        build
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                console.log("Reducer category fetch fulfill initiates")
                if (action.payload?.data && action.payload?.status === "200" && !(action.payload.data instanceof Error))  return action.payload.data;
                else return state;
            })
    }
})

export const categoryReduct = categorySlice.reducer;