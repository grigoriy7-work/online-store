import { baseApi } from '../../app/api/baseApi';
import type { SignUpBody, SignInBody, AuthResult } from '../../app/api/types/types';
import { setToken } from './authSlice';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<AuthResult, SignUpBody>({
      query: (userData) => ({
        method: 'POST',
        url: '/signup',
        body: userData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        dispatch(setToken(result.data.token));
      },
    }),
    signIn: builder.mutation<AuthResult, SignInBody>({
      query: (userData) => ({
        method: 'POST',
        url: '/signin',
        body: userData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        dispatch(setToken(result.data.token));
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
