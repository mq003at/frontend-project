import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { addNotification } from '../../components/Functions/common';
import axiosInstance from '../../test/shared/sharedInstance';
import { AddCategoryWithImageParams, Category, ResponseImage, UpdatedCategory } from '../../types/common';

// Fetch all categories
export const fetchAllCategories = createAsyncThunk('fetchAllCategory', async () => {
  try {
    const res: AxiosResponse<Category[] | Error, any> = await axiosInstance.get('categories');
    if (!(res.data instanceof Error)) return res.data;
  } catch (e) {
    const error = e as AxiosError;
    addNotification(`ERROR ${error.code}`, `${error.message}`, 'danger');
  }
});

// Post in a category
export const addCategoryToServer = createAsyncThunk('createCategoryToServer', async (category: Category) => {
  try {
    const res: AxiosResponse<Category | Error, any> = await axiosInstance.post('categories', category);
    if (!(res.data instanceof Error)) return res.data;
  } catch (e) {
    const error = e as AxiosError;
    addNotification(`ERROR ${error.code}`, `${error.message}`, 'danger');
  }
});

// Update category
export const updateCategory = createAsyncThunk('updateCategory', async ({ id, update }: UpdatedCategory) => {
  try {
    const res: any = await axiosInstance.put(`categories/${id}`, update);
    if (!(res.data instanceof Error)) return res.data;
  } catch (e) {
    const error = e as AxiosError;
    addNotification(`ERROR ${error.code}`, `${error.message}`, 'danger');
  }
});

// Post Category but with image
export const addCatAndImage = createAsyncThunk('addProductAndImage', async ({ image, category }: AddCategoryWithImageParams) => {
  try {
    let images: string = '';
    const response: AxiosResponse<ResponseImage | Error, any> = await axiosInstance.post('/files/upload', image);
    if (!(response.data instanceof Error) && response.data.location) images = response.data.location;

    const res2: AxiosResponse<Category | Error, any> = await axiosInstance.post('products', {
      ...category,
      images: images,
    });
    return res2.data;
  } catch (e) {
    const error = e as Error;
    return error;
  }
});

const initialState: Category[] = [];
const categorySlice = createSlice({
  name: 'categorySlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError || !action.payload === undefined) return state;
        else return action.payload;
      })

      .addCase(addCategoryToServer.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError || action.payload === undefined) return state;
        else return [...state, action.payload];
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        if (!(action.payload instanceof AxiosError) && action.payload !== undefined) {
          const data: Category = action.payload;
          return state.map((cat) => (cat.id === data.id ? data : cat));
        } else return state;
      })

      .addCase(addCatAndImage.fulfilled, (state, action) => {
        if (action.payload instanceof Error || action.payload === undefined) return state;
        else return [...state, action.payload];
      });
  },
});

export const categoryReducer = categorySlice.reducer;
