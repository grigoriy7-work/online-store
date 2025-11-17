import { baseApi } from '../../app/api/baseApi';
import type { Order, Params, ParamsUpdateWithId } from '../../app/api/types/typesOrders';
import type { Result, Filters } from '../../app/api/types/types';

export const orderEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Result<Order>, Filters>({
      query: () => ({
        url: '/orders',
      }),
      providesTags: ['Orders'],
    }),
    createOrder: builder.mutation<Order, Params>({
      query: (orderData) => ({
        method: 'POST',
        url: 'orders',
        body: orderData,
      }),
      invalidatesTags: ['Orders'],
    }),
    updateOrder: builder.mutation<Order, ParamsUpdateWithId>({
      query: (orderData) => ({
        method: 'PATCH',
        url: `orders/${orderData.id}`,
        body: orderData,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const { useLazyGetOrdersQuery, useCreateOrderMutation, useUpdateOrderMutation } =
  orderEndpoints;
