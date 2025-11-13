import { type FC, memo } from 'react';
import { List } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from './../../app/store';

export const ShoppingCartList: FC = memo(() => {
  const products = useSelector((state: RootState) => state.shoppingCart.products);

  return (
    <List
      header={<b>Продукты в корзине</b>}
      bordered
      dataSource={products}
      renderItem={(product) => <List.Item>{product.name}</List.Item>}
    />
  );
});
