import { baseApi } from '../../app/api/baseApi';
import type {
  ProductResult,
  Product,
  Params,
  ParamsWithId,
  Filters,
} from '../../app/api/types/typesProducts';

export const productEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResult, Filters>({
      query: (params) => {
        const filters: any = {};
        if (params.name) filters.name = JSON.stringify(params.name);
        if (params.ids) filters.ids = JSON.stringify(params.ids);
        if (params.pagination) filters.pagination = JSON.stringify(params.pagination);
        if (params.categoryIds) filters.categoryIds = JSON.stringify(params.categoryIds);
        if (params.createdAt) filters.createdAt = JSON.stringify(params.createdAt);
        if (params.updatedAt) filters.updatedAt = JSON.stringify(params.updatedAt);
        if (params.sorting) filters.sorting = JSON.stringify(params.sorting);

        const url = '/products' + '?' + new URLSearchParams(filters).toString();

        return {
          url: url,
        };
      },
      providesTags: ['Products'],
    }),
    createProduct: builder.mutation<Product, Params>({
      query: (productData) => ({
        method: 'POST',
        url: 'products',
        body: productData,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation<Product, ParamsWithId>({
      query: (productData) => ({
        method: 'PATCH',
        url: `products/${productData.id}`,
        body: productData,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const { useLazyGetProductsQuery, useCreateProductMutation, useUpdateProductMutation } =
  productEndpoints;
