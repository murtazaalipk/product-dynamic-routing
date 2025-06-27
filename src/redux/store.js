import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import formReducer from './formSlice'; 

export const store = configureStore({
  reducer: {
    products: productReducer,
    formProducts: formReducer
  },
});
