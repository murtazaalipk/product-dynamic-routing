import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push({ id: uuidv4(), ...action.payload });
    },
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
