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
