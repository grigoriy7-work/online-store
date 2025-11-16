import type { FC } from 'react';
import styles from './Page.module.css';
import { ShoppingCartList } from '../features/shoppingCart/ShoppingCartList';
import { Button, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './../app/store';
import { useCreateOrderMutation } from '../features/orders/orderEndpoints';
import type { Params } from '../app/api/types/typesOrders';
import { shoppingCartClear } from '../features/shoppingCart/shoppingCartSlice';

export const ShoppingCartPage: FC = () => {
  const products = useSelector((state: RootState) => state.shoppingCart.products);
  const sumPrice = products.reduce((acc, product) => acc + product.price, 0);
  const [createorder, { isLoading }] = useCreateOrderMutation();
  const dispatch = useDispatch<AppDispatch>();

  const clickHandler = async () => {
    if (products.length > 0) {
      const paramsOrder: Params = {
        products: products.map((product) => ({ id: product.id, quantity: 1 })),
      };
      await createorder(paramsOrder);
      dispatch(shoppingCartClear());
    }
  };

  return (
    <div className={styles.page}>
      <h2>Корзина</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ShoppingCartList />
        <div
          style={{
            border: '1px solid silver',
            borderRadius: '5px',
            width: '25vw',
            alignSelf: 'self-start',
            padding: '15px',
          }}
        >
          <Space direction="vertical">
            <span>{`Сумма заказа: ${sumPrice}`}</span>
            <Button onClick={clickHandler} disabled={isLoading}>
              Заказать
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};
