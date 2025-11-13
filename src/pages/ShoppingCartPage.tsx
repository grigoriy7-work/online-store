import type { FC } from 'react';
import styles from './Page.module.css';
import { ShoppingCartList } from '../features/shoppingCart/ShoppingCartList';

export const ShoppingCartPage: FC = () => {
  return (
    <div className={styles.page}>
      <h2>Корзина</h2>
      <ShoppingCartList />
    </div>
  );
};
