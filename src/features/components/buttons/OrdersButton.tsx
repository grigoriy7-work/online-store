import type { FC } from 'react';
import { ShoppingOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import sytles from './Buttons.module.css';
import { Badge } from 'antd';

export const OrdersButton: FC = () => {
  return (
    <NavLink to="orders" className={sytles.link}>
      <Badge count={0} color="var(--color-primary)">
        <ShoppingOutlined
          style={{ display: 'block', fontSize: '2em', color: 'var(--text-color-light)' }}
        />
      </Badge>
    </NavLink>
  );
};
