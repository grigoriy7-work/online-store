import { type FC, useEffect } from 'react';
import { OrderList } from '../features/orders/OrderList';
import { useSelector } from 'react-redux';
import type { RootState } from './../app/store';
import { useLazyGetOrdersQuery } from '../features/orders/orderEndpoints';
import styles from './Page.module.css';
import { Spin } from 'antd';

export const OrdersPage: FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [trigger, { data, isLoading }] = useLazyGetOrdersQuery();
  const orders = data?.data ?? [];

  useEffect(() => {
    if (token) trigger({ sorting: { field: 'createdAt', type: 'DESC' } });
  }, [token]);

  return (
    <div className={styles.page}>
      <Spin spinning={isLoading}>
        <h2>Заказаы</h2>
        <OrderList orders={orders} />
      </Spin>
    </div>
  );
};
