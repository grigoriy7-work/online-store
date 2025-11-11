import { baseApi } from '../../app/api/baseApi';
import type { Profile } from '../../app/api/types/typesProfile';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, void>({
      query: () => ({
        url: 'profile',
      }),
    }),
  }),
});

export const { useLazyGetProfileQuery } = profileApi;
