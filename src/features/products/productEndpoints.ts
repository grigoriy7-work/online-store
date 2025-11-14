import { baseApi } from '../../app/api/baseApi';
import type { ProductResult, Product, Params, Filters } from '../../app/api/types/typesProducts';

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
