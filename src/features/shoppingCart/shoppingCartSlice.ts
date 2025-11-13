import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../app/api/types/typesProducts';

interface ShoppingCartState {
  products: Product[];
}

const initialState: ShoppingCartState = {
  products: [],
};

export const shoppingCatSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    remove: (state, action: PayloadAction<Product>) => {
      state.products = state.products.filter((product) => product.id !== action.payload.id);
    },
    clear: (state) => {
      state.products = [];
    },
  },
});

export const { add, remove, clear } = shoppingCatSlice.actions;
export default shoppingCatSlice.reducer;
