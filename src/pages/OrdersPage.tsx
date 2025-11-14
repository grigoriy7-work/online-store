import { type FC, useEffect } from 'react';
import { OrderList } from '../features/orders/OrderList';
import { useSelector } from 'react-redux';
import type { RootState } from './../app/store';
import { useLazyGetOrdersQuery } from '../features/orders/orderEndpoints';
import styles from './Page.module.css';

export const OrdersPage: FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [trigger, { data }] = useLazyGetOrdersQuery();
  const orders = data?.data ?? [];

  useEffect(() => {
    if (token) trigger({ pagination: { pageNumber: 1, pageSize: 2 } });
  }, [token]);

  return (
    <div className={styles.page}>
      <h2>Заказаы</h2>
      <OrderList orders={orders} />
    </div>
  );
};
