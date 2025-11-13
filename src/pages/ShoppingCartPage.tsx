import type { FC } from 'react';
import styles from './Page.module.css';
import { ShoppingCartList } from '../features/shoppingCart/ShoppingCartList';
import { Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from './../app/store';

export const ShoppingCartPage: FC = () => {
  const products = useSelector((state: RootState) => state.shoppingCart.products);
  const sumPrice = products.reduce((acc, product) => acc + product.price, 0);

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
            <Button>Заказать</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};
