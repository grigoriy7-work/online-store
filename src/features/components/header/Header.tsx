import type { FC } from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { ProfileButton, LoginButton, ShoppingCartMenuButton, OrdersButton } from '../buttons';
import { Space } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

export const Header: FC = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  return (
    <div className={[styles.header].join(' ')}>
      <div className={styles.links}>
        <NavLink to="/" className={styles['nav-link']}>
          <h1>Интернет-магазин</h1>
        </NavLink>
        <Space size="large">
          {isAuth ? <ShoppingCartMenuButton /> : null}
          {isAuth ? <OrdersButton /> : null}
          {isAuth ? <ProfileButton /> : <LoginButton />}
        </Space>
      </div>
    </div>
  );
};
