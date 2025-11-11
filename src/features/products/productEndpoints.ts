import { baseApi } from '../../app/api/baseApi';
import type { ProductResult, Product, Params } from '../../app/api/types/typesProducts';
import type { Filters } from './../../app/api/types/types';

export const productEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResult, Filters>({
      query: () => ({
        url: 'products',
      }),
    }),
    createProduct: builder.mutation<Product, Params>({
      query: (productData) => ({
        method: 'POST',
        url: 'products',
        body: productData,
      }),
    }),
  }),
});

export const { useLazyGetProductsQuery, useCreateProductMutation } = productEndpoints;
