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
    shoppingCartAdd: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    shoppingCartRemove: (state, action: PayloadAction<Product>) => {
      state.products = state.products.filter((product) => product.id !== action.payload.id);
    },
    shoppingCartClear: (state) => {
      state.products = [];
    },
  },
});

export const { shoppingCartAdd, shoppingCartRemove, shoppingCartClear } = shoppingCatSlice.actions;
export default shoppingCatSlice.reducer;
