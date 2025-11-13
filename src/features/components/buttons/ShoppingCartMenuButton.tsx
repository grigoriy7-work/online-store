import type { FC } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import sytles from './Buttons.module.css';
import { Badge } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

export const ShoppingCartMenuButton: FC = () => {
  const products = useSelector((state: RootState) => state.shoppingCart.products);
  const productIdList = products.map((product) => product.id);
  const countProducts = [...new Set(productIdList)].length;

  return (
    <NavLink to="shopping-cart" className={sytles.link}>
      <Badge count={countProducts}>
        <ShoppingCartOutlined
          style={{ display: 'block', fontSize: '2.3em', color: 'var(--text-color-light)' }}
        />
      </Badge>
    </NavLink>
  );
};
