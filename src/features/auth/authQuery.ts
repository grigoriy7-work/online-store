import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SignUpBody, SignInBody, ResultFetchAuth, AuthResult } from '../../app/api/types';
import { setToken } from './authSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    signUp: builder.mutation<ResultFetchAuth, SignUpBody>({
      query: (userData) => ({
        method: 'POST',
        url: '/signup',
        body: userData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setToken(result.data.authResult?.token));
        } catch (error) {
          console.error('Ошибка регистрации: ', error);
        }
      },
    }),
    signIn: builder.mutation<AuthResult, SignInBody>({
      query: (userData) => ({
        method: 'POST',
        url: '/signin',
        body: userData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.info('result', result);
          dispatch(setToken(result.data.token));
        } catch (error) {
          console.error('Ошибка аутентификации: ', error);
        }
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
