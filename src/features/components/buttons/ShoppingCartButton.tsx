import type { FC } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import sytles from './Buttons.module.css';

export const ShoppingCartButton: FC = () => {
  return (
    <NavLink to="shopping-cart" className={sytles.link}>
      <ShoppingCartOutlined
        style={{ display: 'block', fontSize: '2.3em', color: 'var(--text-color-light)' }}
      />
    </NavLink>
  );
};
