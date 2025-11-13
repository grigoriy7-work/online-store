import { type FC, memo } from 'react';
import { List } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from './../../app/store';

export const ShoppingCartList: FC = memo(() => {
  const productIdList = useSelector((state: RootState) => state.shoppingCart.productIdList);

  return (
    <List
      header="Продукты в корзине"
      bordered
      dataSource={productIdList}
      renderItem={(productId) => <List.Item>{productId}</List.Item>}
    />
  );
});
