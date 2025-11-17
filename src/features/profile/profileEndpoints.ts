import { baseApi } from '../../app/api/baseApi';
import type { Profile, UpdateProfileBody } from '../../app/api/types/typesProfile';
import { setProfile } from './profileSlice';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, void>({
      query: () => ({
        url: 'profile',
      }),
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<Profile, UpdateProfileBody>({
      query: (profileData) => ({
        method: 'PATCH',
        url: 'profile',
        body: profileData,
      }),
      invalidatesTags: ['Profile'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        dispatch(setProfile(result.data));
      },
    }),
  }),
});

export const { useLazyGetProfileQuery, useUpdateProfileMutation } = profileApi;
