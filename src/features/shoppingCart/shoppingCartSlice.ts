import { createSlice } from '@reduxjs/toolkit';

interface ShoppingCartState {
  productIdList: string[];
}

const initialState: ShoppingCartState = {
  productIdList: ['691410478e877ac8a9c6eb38', '691407138e877ac8a9c6eb12'],
};

export const shoppingCatSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    add: (state, action) => {
      state.productIdList.push(action.payload);
    },
    remove: (state, action) => {
      state.productIdList = state.productIdList.filter((id) => id !== action.payload);
    },
    clear: (state) => {
      state.productIdList = [];
    },
  },
});

export const { add, remove, clear } = shoppingCatSlice.actions;
export default shoppingCatSlice.reducer;
