import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/common";
import axios, { AxiosResponse } from "axios";
import { UpdatedProduct } from "../../types/product";

// Fetch all products from API; in case the fetch fails, use the backup one stored locally
export const fetchAllProducts = createAsyncThunk("fetchAllProducts", async () => {
  try {
    const res: AxiosResponse<Product[] | Error, any> = await axios.get("https://api.escuelajs.co/api/v1/products");
    return { data: res.data, status: res.request.status };
  } catch (e: any) {
    throw new Error(e.message);
  }
});

export const addProductToServer = createAsyncThunk("addProductToServer", async (product: Product) => {
  try {
    const res: AxiosResponse<Product | Error, any> = await axios.post("https://api.escuelajs.co/api/v1/products", product);
    return res.data;
  } catch (e) {
    console.log("adderr", e);
  }
});

// Take in an updated Product, generate metadata and update it on the server
export const modifyProduct = createAsyncThunk("modifyProduct", async (updatedProduct: Product) => {
  try {
    const res: AxiosResponse<Product | Error, any> = await axios.put(`https://api.escuelajs.co/api/v1/products/${updatedProduct.id}`, updatedProduct);
    return res.data;
  } catch (e) {
    console.log("upderr", e);
  }
});

export const deleteProduct = createAsyncThunk("deleteProduct", async (id: number) => {
  try {
    const res: AxiosResponse<string | Error, any> = await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
    return { id: id, status: res.status, message: res.data };
  } catch (e) {
    console.log("delerr", e);
  }
});

const productSlice = createSlice({
  name: "productSlice",
  initialState: [] as Product[],
  reducers: {
    addAll: (state, action) => {
      return action.payload;
    },

    // Find the product in global product
    findProduct: (state, action: PayloadAction<string>) => {
      return state.filter((product: Product) => product.title.includes(action.payload));
    },

    // Sort global product based on category
    sortAllByCategory: (state, action: PayloadAction<"asc" | "des">) => {
      if (action.payload === "asc") {
        state.sort((a, b) => {
          if (a.category.name.toLowerCase() > b.category.name.toLowerCase()) return 1;
          if (a.category.name.toLowerCase() < b.category.name.toLowerCase()) return -1;
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          return 1;
        });
      } else {
        state.sort((a, b) => {
          if (a.category.name.toLowerCase() < b.category.name.toLowerCase()) return 1;
          if (a.category.name.toLowerCase() > b.category.name.toLowerCase()) return -1;
          if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
          if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
          return 1;
        });
      }
    },

    // Sort global product based on price
    sortAllByPrice: (state, action: PayloadAction<"asc" | "des">) => {
      if (action.payload === "asc") state.sort((a, b) => (a.price > b.price ? 1 : -1));
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        const data = action.payload.data;
        if (data && action.payload.status === 200) return data;
        else return state;
      })

      .addCase(fetchAllProducts.pending, (state, action) => {
        console.log("Now loading...");
        return state;
      })

      .addCase(fetchAllProducts.rejected, (state, action) => {
        console.log("Error fetching data");
        return state;
      })

      .addCase(addProductToServer.fulfilled, (state, action) => {
        if (action.payload) state.push(action.payload);
        else return state;
      })

      .addCase(modifyProduct.fulfilled, (state, action) => {
        return state.map((product: Product) => {
          if (!(action.payload instanceof Error) && product.id === action.payload?.id) return action.payload;
          return product;
        });
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (action.payload) {
          const { id, status, message } = action.payload;
          console.log("deletemsg", message)
          if (status === 200) return state.filter((product: Product) => product.id !== id);
          else return state
        }
      });
  },
});

export const productReducer = productSlice.reducer;
export const { addAll, findProduct, sortAllByCategory, sortAllByPrice } = productSlice.actions;
