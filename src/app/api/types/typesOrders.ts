import type { User } from './types';
import type { Product } from './typesProducts';

export type Order = {
  id: string;
  products: OrderProduct[];
  user: User;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  commandId: string;
};

export type OrderProduct = {
  _id: string; // служебный id - это не id продукта
  product: Product;
  quantity: number;
};

export enum OrderStatus {
  PendingConfirmation = 'pending_confirmation',
  Processing = 'processing',
  Packaging = 'packaging',
  WaitingForDelivery = 'waiting_for_delivery',
  InTransit = 'in_transit',
  Delivered = 'delivered',
  ReturnRequested = 'return_requested',
  OrderCancelled = 'order_cancelled',
}

export type Params = {
  products: Array<{
    id: string;
    quantity: number;
  }>;
  status?: OrderStatus;
};

type ParamsUpdate = {
  productIds?: string[];
  status?: OrderStatus;
};

export type ParamsUpdateWithId = ParamsUpdate & {
  id: string;
};

export type Filters = {
  productIds?: string[];
  userId?: string;
  ids?: string[];
  status?: OrderStatus;
  pagination?: {
    pageSize?: number;
    pageNumber?: number;
  };
  createdAt?: {
    gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  };
  updatedAt?: {
    gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  };
  sorting?: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date';
  };
};
