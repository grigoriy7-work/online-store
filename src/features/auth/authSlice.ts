import { createSlice } from '@reduxjs/toolkit';
import { baseApi } from '../../app/api/baseApi';
import type { AppDispatch } from './../../app/store';

interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    clearToken: (state) => {
      state.token = '';
      localStorage.removeItem('token');
    },
  },
});

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(clearToken());
  dispatch(baseApi.util.resetApiState());
};

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
