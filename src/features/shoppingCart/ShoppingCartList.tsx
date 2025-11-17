import { type FC, memo } from 'react';
import { List, Typography, Space } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from './../../app/store';
import type { Product } from '../../app/api/types/typesProducts';
import type { ProductList } from '../products/ProductList';

interface ProductList {
  id: string;
  name: string;
  price: number;
  sumPrice: number;
  amount: number;
}

export const ShoppingCartList: FC = memo(() => {
  const products = useSelector((state: RootState) => state.shoppingCart.products);

  const groupProducts = products.reduce((acc: ProductList[], product: Product) => {
    const findProduct = acc.find((p) => p.id == product.id);
    if (findProduct) {
      findProduct.amount += 1;
      findProduct.sumPrice += product.price;
    } else {
      acc.push({
        id: product.id,
        name: product.name,
        price: product.price,
        sumPrice: product.price,
        amount: 1,
      });
    }

    return acc;
  }, []);

  return (
    <List
      header={<b>Продукты в корзине</b>}
      bordered
      dataSource={groupProducts}
      renderItem={(product) => (
        <List.Item>
          <List.Item.Meta
            title={product.name}
            description={
              <Space>
                <Typography.Text>{'цена: ' + product.price}</Typography.Text>
                <Typography.Text>{'кол-во: ' + product.amount}</Typography.Text>
                <Typography.Text type="danger">{'сумма: ' + product.sumPrice}</Typography.Text>
              </Space>
            }
          />
        </List.Item>
      )}
      style={{ width: '60vw' }}
    />
  );
});
