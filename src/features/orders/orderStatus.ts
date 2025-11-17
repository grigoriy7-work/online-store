import { OrderStatus } from '../../app/types/typesOrders';

export interface StatusValue {
  type: OrderStatus;
  name: string;
  code: number;
}

export const statusValues: StatusValue[] = [
  { type: OrderStatus.PendingConfirmation, name: 'ожидает подтверждения', code: 1 },
  { type: OrderStatus.Processing, name: 'обработка', code: 2 },
  { type: OrderStatus.Packaging, name: 'упаковка', code: 3 },
  { type: OrderStatus.WaitingForDelivery, name: 'ожидание доставки', code: 4 },
  { type: OrderStatus.InTransit, name: 'в пути', code: 5 },
  { type: OrderStatus.Delivered, name: 'доставлен', code: 6 },
];

export const statusValues2: StatusValue[] = [
  { type: OrderStatus.ReturnRequested, name: 'запрос на возврат', code: 7 },
  { type: OrderStatus.OrderCancelled, name: 'заказ отменён', code: 8 },
];

export const getNextStatus = (statusType: OrderStatus): StatusValue | undefined => {
  const statusValue = statusValues.find((s) => s.type === statusType);
  if (!statusValue) return undefined;
  if (statusValue.code >= 6) return undefined;

  const newStatusValue = statusValues.find((s) => s.code === statusValue.code + 1);
  return newStatusValue;
};

export const getPreviousStatus = (statusType: OrderStatus): StatusValue | undefined => {
  const statusValue = statusValues.find((s) => s.type === statusType);
  if (!statusValue) return undefined;
  if (statusValue.code <= 1) return undefined;

  const newStatusValue = statusValues.find((s) => s.code === statusValue.code - 1);
  return newStatusValue;
};

export const getStatusName = (status: OrderStatus): string => {
  const statusValue = statusValues.find((s) => s.type === status);
  return statusValue?.name ?? '';
};
