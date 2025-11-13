import { baseApi } from '../../app/api/baseApi';
import type { Order, Params } from '../../app/api/types/typesOrders';

export const orderEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, Params>({
      query: (orderData) => ({
        query: 'POST',
        url: 'orders',
        body: orderData,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderEndpoints;
