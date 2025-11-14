import type { FC } from 'react';
import { ShoppingOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import sytles from './Buttons.module.css';

export const OrdersButton: FC = () => {
  return (
    <NavLink to="orders" className={sytles.link}>
      <ShoppingOutlined
        style={{ display: 'block', fontSize: '1.9em', color: 'var(--text-color-light)' }}
      />
    </NavLink>
  );
};
