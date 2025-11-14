import type { FC, MouseEvent } from 'react';
import { List, Card } from 'antd';
import type { Product } from '../../app/api/types/typesProducts';
import photo from './../../assets/images/product_tea.png';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { shoppingCartAdd } from '../shoppingCart/shoppingCartSlice';

export interface ProductListProps {
  products: Product[];
}

const { Meta } = Card;

export const ProductList: FC<ProductListProps> = ({ products }) => {
  const dispatch = useDispatch<AppDispatch>();

  const clickHandler = (e: MouseEvent, product: Product) => {
    e.stopPropagation();
    dispatch(shoppingCartAdd(product));
  };

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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Meta title={product.name} description={'цена: ' + product.price} />
              <div style={{ alignSelf: 'end' }}>
                <ShoppingCartOutlined
                  style={{ fontSize: '1.8em', color: 'var(--color-primary)' }}
                  onClick={(e) => clickHandler(e, product)}
                />
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};
