import { type FC, useCallback, memo } from 'react';
import { Card, Typography, Space, Button } from 'antd';
import { type Order } from '../../app/types/typesOrders';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { useUpdateOrderMutation } from './orderEndpoints';
import { getNextStatus, getPreviousStatus, getStatusName } from './orderStatus';

export interface OrderCardProps {
  order: Order;
}

type NewStatusType = 'next' | 'previous';

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const [updateOrder] = useUpdateOrderMutation();

  const sumPrice = order.products.reduce(
    (acc, orderProduct) => acc + orderProduct.product.price * orderProduct.quantity,
    0,
  );

  const newStatusHandler = useCallback(async (order: Order, newStatusType: NewStatusType) => {
    const newStatus =
      newStatusType == 'next' ? getNextStatus(order.status) : getPreviousStatus(order.status);
    if (!newStatus) return;

    try {
      await updateOrder({ id: order.id, status: newStatus.type });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <Typography.Text>Сумма заказа: {sumPrice}</Typography.Text>
            <Typography.Text type="success">Статус: {getStatusName(order.status)}</Typography.Text>
          </Space>
          <Space>
            <Button shape="round">
              <LeftCircleOutlined
                style={{ fontSize: '1.2em' }}
                onClick={() => newStatusHandler(order, 'previous')}
              />
            </Button>
            <Button shape="round">
              <RightCircleOutlined
                style={{ fontSize: '1.2em' }}
                onClick={() => newStatusHandler(order, 'next')}
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
});
