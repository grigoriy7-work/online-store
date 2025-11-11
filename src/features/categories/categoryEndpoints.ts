import { baseApi } from '../../app/api/baseApi';
import type { Category, Params, CategoryResult } from '../../app/api/types/typesCategories';
import type { Filters } from './../../app/api/types/types';
import { saveCategory } from './categorySlice';

export const categoryEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryResult, Filters>({
      query: () => ({
        url: 'categories',
      }),
    }),
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

export const { useLazyGetCategoriesQuery, useCreateCategoryMutation } = categoryEndpoints;
