import type { FC, MouseEvent } from 'react';
import { useState } from 'react';
import { List, Card, Image } from 'antd';
import type { Product, ParamsWithId } from '../../app/api/types/typesProducts';
import photo from './../../assets/images/min_noImage.jpg';
import { ShoppingCartOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { shoppingCartAdd } from '../shoppingCart/shoppingCartSlice';
//import { useNavigate } from 'react-router-dom';
import { ProductWindow } from './ProductWindow';

export interface ProductListProps {
  products: Product[];
}

const { Meta } = Card;

export const ProductList: FC<ProductListProps> = ({ products }) => {
  const dispatch = useDispatch<AppDispatch>();
  //const navigate = useNavigate();
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ParamsWithId | undefined>();

  const clickHandler = (e: MouseEvent, product: Product) => {
    e.stopPropagation();
    dispatch(shoppingCartAdd(product));
  };

  const editProductHandler = (product: Product) => {
    //navigate(`/seller?productId=${product.id}`)
    const params: ParamsWithId = {
      ...product,
      categoryId: product.category.id,
      desc: product.desc == undefined ? '' : product.desc,
      id: product.id,
    };
    setSelectedProduct(params);
    setIsModalProductOpen(true);
  };

  return (
    <>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6 }}
        dataSource={products}
        renderItem={(product) => (
          <List.Item>
            <Card
              hoverable
              cover={
                <Image
                  alt={`фото ${product?.name}`}
                  src={product.photo == undefined ? photo : product.photo.replace('http', 'https')}
                />
              }
              actions={[
                true && (
                  <EditOutlined
                    key="edit"
                    style={{ fontSize: '1.5em' }}
                    onClick={() => editProductHandler(product)}
                  />
                ),
                <ShoppingCartOutlined
                  style={{ fontSize: '1.6em' }}
                  onClick={(e) => clickHandler(e, product)}
                />,
              ].filter(Boolean)}
            >
              <Meta title={product.name} description={'цена: ' + product.price} />
              <div style={{ alignSelf: 'end' }}></div>
            </Card>
          </List.Item>
        )}
      />
      <ProductWindow
        isOpen={isModalProductOpen}
        closeFunc={() => setIsModalProductOpen(false)}
        selectedProduct={selectedProduct}
        type="update"
      />
    </>
  );
};
