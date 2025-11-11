import { baseApi } from '../../app/api/baseApi';
import type { Category, Params } from '../../app/api/types/typesCategories';
import { saveCategory } from './categorySlice';

export const categoryEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<Category, Params>({
      query: (profileData) => ({
        method: 'POST',
        url: 'categories',
        body: profileData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        dispatch(saveCategory(result.data));
      },
    }),
  }),
});

export const { useCreateCategoryMutation } = categoryEndpoints;
