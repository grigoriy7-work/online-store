import { createSlice } from '@reduxjs/toolkit';

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
