import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    console.log(data.products);
    return data.products;
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // addProduct: (state, action) => {
    //   state.push({ id: uuidv4(), ...action.payload });
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    })
  },
});

// export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
