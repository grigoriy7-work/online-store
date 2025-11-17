import type { FC } from 'react';
import { Card, Typography, Space, Button } from 'antd';
import { type Order, OrderStatus } from '../../app/api/types/typesOrders';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { useUpdateOrderMutation } from './orderEndpoints';

export interface OrderCardProps {
  order: Order;
}

interface StatusValue {
  type: OrderStatus;
  name: string;
  code: number;
}

const statusValues: StatusValue[] = [
  { type: OrderStatus.PendingConfirmation, name: 'ожидает подтверждения', code: 1 },
  { type: OrderStatus.Processing, name: 'обработка', code: 2 },
  { type: OrderStatus.Packaging, name: 'упаковка', code: 3 },
  { type: OrderStatus.WaitingForDelivery, name: 'ожидание доставки', code: 4 },
  { type: OrderStatus.InTransit, name: 'в пути', code: 5 },
  { type: OrderStatus.Delivered, name: 'доставлено', code: 6 },
];

const statusValues2: StatusValue[] = [
  { type: OrderStatus.ReturnRequested, name: 'запрос на возврат', code: 7 },
  { type: OrderStatus.OrderCancelled, name: 'заказ отменён', code: 8 },
];

const getNextStatusType = (statusType: string): StatusValue | undefined => {
  const statusValue = statusValues.find((s) => s.type === statusType);
  if (!statusValue) return undefined;
  if (statusValue.code >= 6) return undefined;

  const newStatusValue = statusValues.find((s) => s.code === statusValue.code + 1);
  return newStatusValue;
};

export const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const [updateOrder] = useUpdateOrderMutation();

  const sumPrice = order.products.reduce(
    (acc, orderProduct) => acc + orderProduct.product.price * orderProduct.quantity,
    0,
  );

  const nextStatusHandler = async (order: Order) => {
    console.info('left orderId', order.status);
    const newStatus = getNextStatusType(order.status);
    console.info('newStatus', newStatus);
    if (!newStatus) return;

    try {
      const response = await updateOrder({ id: order.id, status: newStatus.type });
      console.info('response', response);
    } catch (error) {
      console.error(error);
    }
  };

  const previousStatusHandler = (order: Order) => {
    console.info('right orderId', order.status);
  };

  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <Typography.Text>Сумма заказа: {sumPrice}</Typography.Text>
            <Typography.Text type="success">Статус: {order.status}</Typography.Text>
          </Space>
          <Space>
            <Button shape="round">
              <LeftCircleOutlined
                style={{ fontSize: '1.2em' }}
                onClick={() => previousStatusHandler(order)}
              />
            </Button>
            <Button shape="round">
              <RightCircleOutlined
                style={{ fontSize: '1.2em' }}
                onClick={() => nextStatusHandler(order)}
              />
            </Button>
          </Space>
        </div>
      }
      key={order.id}
      style={{ width: '100vw' }}
    >
      {order.products.map((orderProduct) => (
        <Card.Grid key={orderProduct._id} hoverable={false}>
          <Card.Meta
            title={orderProduct.product.name}
            description={'Цена: ' + orderProduct.product.price}
          />
        </Card.Grid>
      ))}
    </Card>
  );
};
