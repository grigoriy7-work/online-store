import type { FC } from 'react';
import { Card } from 'antd';
import type { Order } from '../../app/api/types/typesOrders';

export interface OrderCardProps {
  order: Order;
}

export const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const sumPrice = order.products.reduce(
    (acc, orderProduct) => acc + orderProduct.product.price * orderProduct.quantity,
    0,
  );

  return (
    <Card title={'Сумма заказа: ' + sumPrice} key={order.id} style={{ width: '100vw' }}>
      {order.products.map((orderProduct) => (
        <Card.Grid key={orderProduct._id}>
          <Card.Meta
            title={orderProduct.product.name}
            description={'Цена: ' + orderProduct.product.price}
          />
        </Card.Grid>
      ))}
    </Card>
  );
};
