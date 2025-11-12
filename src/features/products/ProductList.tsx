import type { FC } from 'react';
import { List, Card } from 'antd';
import type { Product } from '../../app/api/types/typesProducts';
import photo from './../../assets/images/product_tea.png';

export interface ProductListProps {
  products: Product[];
}

const { Meta } = Card;

export const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6 }}
      dataSource={products}
      renderItem={(product) => (
        <List.Item>
          <Card
            hoverable
            cover={
              <img draggable={false} alt={`фото ${product.name}`} src={product.photo ?? photo} />
            }
            style={{ maxWidth: 300 }}
          >
            <Meta title={product.name} description={'цена: ' + product.price} />
          </Card>
        </List.Item>
      )}
    />
  );
};
