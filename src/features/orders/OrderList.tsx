import type { FC } from 'react';
import { List } from 'antd';
import type { Order } from '../../app/api/types/typesOrders';
import { OrderCard } from './OrderCard';

export interface OrderListProps {
  orders: Order[];
}

export const OrderList: FC<OrderListProps> = ({ orders }) => {
  return (
    <List
      dataSource={orders}
      renderItem={(order) => (
        <List.Item>
          <OrderCard order={order} key={order.id} />
        </List.Item>
      )}
    ></List>
  );
};
