import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ShoppingCartState {
  productIdList: string[];
}

const initialState: ShoppingCartState = {
  productIdList: [],
};

export const shoppingCatSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.productIdList.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.productIdList = state.productIdList.filter((id) => id !== action.payload);
    },
    clear: (state) => {
      state.productIdList = [];
    },
  },
});

export const { add, remove, clear } = shoppingCatSlice.actions;
export default shoppingCatSlice.reducer;
