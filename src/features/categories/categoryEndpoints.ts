import { baseApi } from '../../app/api/baseApi';
import type {
  Category,
  Params,
  CategoryResult,
  ParamsWithId,
} from '../../app/types/typesCategories';
import type { Filters } from '../../app/types/types';
import { saveCategory } from './categorySlice';

export const categoryEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryResult, Filters>({
      query: () => ({
        url: 'categories',
      }),
      providesTags: ['Categories'],
    }),
    createCategory: builder.mutation<Category, Params>({
      query: (profileData) => ({
        method: 'POST',
        url: 'categories',
        body: profileData,
      }),
      invalidatesTags: ['Categories'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        dispatch(saveCategory(result.data));
      },
    }),
    updateCategory: builder.mutation<Category, ParamsWithId>({
      query: (categoryData) => ({
        method: 'PATCH',
        url: `categories/${categoryData.id}`,
        body: categoryData,
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const { useLazyGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation } =
  categoryEndpoints;
