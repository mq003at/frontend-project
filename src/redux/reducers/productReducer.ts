import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddProductWithImageParams, Product, ProductAdd, ResponseImage } from '../../types/common';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { UpdatedProduct } from '../../types/common';
import axiosInstance from '../../test/shared/sharedInstance';
import { addNotification } from '../../components/Functions/common';
// Backup when FAkeAPI changes
// import product from '../../assets/products.json';

// Fetch all products from API; in case the fetch fails, use the backup one stored locally
export const fetchAllProducts = createAsyncThunk('fetchAllProducts', async () => {
  try {
    const res: AxiosResponse<Product[] | Error, any> = await axiosInstance.get('products');
    // const fetchRes = await fetch("/assets/products.json"); //Backup when fakeapi's data changes
    // const res = await fetchRes.json();
    // return { data: res.data, status: res.request.status };
    if (!(res.data instanceof Error)) return { data: res.data, status: 200 };
  } catch (e: any) {
    throw new Error(e.message);
  }
});

export const addProductToServer = createAsyncThunk('addProductToServer', async (product: ProductAdd) => {
  try {
    const res: AxiosResponse<Product | Error, any> = await axiosInstance.post('products', product);
    if (!(res.data instanceof Error)) {
      addNotification('Product added', `${product.title} has been added to the server`, 'success');
    }
  } catch (e) {
    const error = e as AxiosError;
    addNotification(`ERROR ${error.code}`, `${error.message}`, 'danger');
  }
});

// Take in an updated Product, generate metadata and update it on the server
export const modifyProduct = createAsyncThunk('modifyProduct', async ({ id, update }: UpdatedProduct) => {
  try {
    const res: AxiosResponse<Product | Error, any> = await axiosInstance.put(`/products/${id}`, update);
    if (!(res.data instanceof Error) && res.data !== undefined) return res.data;
  } catch (e) {
    const error = e as AxiosError;
    addNotification(`ERROR ${error.code}`, `${error.message}`, 'danger');
  }
});

export const deleteProduct = createAsyncThunk('deleteProduct', async (id: number) => {
  try {
    const res: AxiosResponse<string | Error, any> = await axiosInstance.delete(`/products/${id}`);
    if (!(res.data instanceof Error)) return { id: id, status: res.status, message: res.data };
  } catch (e) {
    const error = e as AxiosError;
    addNotification(`ERROR ${error.code}`, `${error.message}`, 'danger');
  }
});

// Accept an array images and push them into the API.
export const addProductAndImage = createAsyncThunk('addProductAndImage', async ({ imageArray, product }: AddProductWithImageParams) => {
  try {
    const images: string[] = [];
    for (const img of imageArray) {
      const response: AxiosResponse<ResponseImage | Error, any> = await axiosInstance.post('/files/upload', img);
      if (!(response.data instanceof Error) && response.data.location) images.push(response.data.location);
    }

    // Does it need to be 3?
    if (images.length <= 0) {
    } else {
      const res2: AxiosResponse<Product | Error, any> = await axiosInstance.post('products', {
        ...product,
        images: images,
      });
      return res2.data;
    }
  } catch (e) {
    const error = e as AxiosError;
    if (error.request) console.log('addproductwimage-err-request', error.request.data);
    else if (error.response) console.log('addproductwimage-err-response', error.response.data);
    else console.log('addproductwimage-err-config', error.config);
  }
});

// Product SLice
const productSlice = createSlice({
  name: 'productSlice',
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
    sortAllByCategory: (state, action: PayloadAction<'asc' | 'des'>) => {
      if (action.payload === 'asc') {
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
    sortAllByPrice: (state, action: PayloadAction<'asc' | 'des'>) => {
      if (action.payload === 'asc') state.sort((a, b) => (a.price > b.price ? 1 : -1));
      else state.sort((a, b) => (a.price > b.price ? -1 : 1));
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        if (action.payload !== undefined && action.payload.data && action.payload.status === 200) return action.payload.data;
        else return state;
      })

      .addCase(fetchAllProducts.pending, (state, action) => {
        console.log('Now loading...');
        return state;
      })

      .addCase(fetchAllProducts.rejected, (state, action) => {
        return state;
      })

      .addCase(addProductToServer.fulfilled, (state, action) => {
        if (action.payload !== undefined) state.push(action.payload);
        else return state;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        // We can use hasOwnProperty to check for the property
        if (action.payload !== undefined && action.payload.hasOwnProperty('id') && action.payload.hasOwnProperty('status')) {
          const { id, status, message } = action.payload;
          if (status === 200) return state.filter((product: Product) => product.id !== id);
          else return state;
        } else {
          return state;
        }
      })

      // Testing using spread operator
      .addCase(addProductAndImage.fulfilled, (state, action) => {
        if (action.payload !== undefined) return [...state, action.payload];
        else return [...state];
      });
  },
});

export const productReducer = productSlice.reducer;
export const { addAll, findProduct, sortAllByCategory, sortAllByPrice } = productSlice.actions;
