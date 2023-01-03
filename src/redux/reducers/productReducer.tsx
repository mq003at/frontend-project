import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/common";

// Fetch all products from API; in case the fetch fails, use the backup one stored locally
export const fetchAllProducts = createAsyncThunk (
    "fetchAllProducts",
    async () => {
        try {
            const jsondata = await fetch("https://api.escuelajs.co/api/v1/products")
            const data:Product[]|Error = await jsondata.json()
            return data
        } catch (e: any) {throw new Error(e.message)}
    }
)

const productSlice = createSlice({
    name: "productSlice",
    initialState: [] as Product[],
    reducers: {
        addAll: (state, action) => {
            return action.payload
        }
    },
    extraReducers: build => {
        build.addCase(fetchAllProducts.fulfilled, (state, action) => {
            if (action.payload && "message" in action.payload) return state
            else if (!action.payload) return state
            return state
        })
    }
})

export const productReducer = productSlice.reducer
export const {addAll} = productSlice.actions
