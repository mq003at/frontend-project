import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {productReducer} from './reducers/productReducer';

export const store = configureStore({
  reducer: {
    productReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
