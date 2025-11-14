import { baseApi } from '../../app/api/baseApi';
import type { Order, Params } from '../../app/api/types/typesOrders';
import type { Result, Filters } from '../../app/api/types/types';

export const orderEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Result<Order>, Filters>({
      query: () => ({
        url: '/orders',
      }),
    }),
    createOrder: builder.mutation<Order, Params>({
      query: (orderData) => ({
        method: 'POST',
        url: 'orders',
        body: orderData,
      }),
    }),
  }),
});

export const { useLazyGetOrdersQuery, useCreateOrderMutation } = orderEndpoints;
