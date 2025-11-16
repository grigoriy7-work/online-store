import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import authReducer from './../features/auth/authSlice';
import profileReucer from './../features/profile/profileSlice';
import categoryReducer from './../features/categories/categorySlice';
import shoppingCartReducer from './../features/shoppingCart/shoppingCartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReucer,
    category: categoryReducer,
    shoppingCart: shoppingCartReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
