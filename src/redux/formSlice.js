import { createSlice  } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';



const formSlice = createSlice({
  name: 'formProducts',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push({ id: uuidv4(), ...action.payload });
    },
  },
});

export const { addProduct } = formSlice.actions;
export default formSlice.reducer;
