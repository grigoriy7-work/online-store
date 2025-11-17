import { createSlice } from '@reduxjs/toolkit';
import type { Category } from '../../app/types/typesCategories';

interface CategoryState {
  categories: Array<Category>;
}

const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    saveCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action) => {
      let index = state.categories.indexOf(action.payload);

      if (index !== -1) {
        state.categories.splice(index, 1);
      }
    },
  },
});

export const { saveCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
