import type { FC } from 'react';
import { useEffect } from 'react';
import styles from './Page.module.css';
import { ProductList } from '../features/products/ProductList';
import { useLazyGetProductsQuery } from './../features/products/productEndpoints';
import { useSelector } from 'react-redux';
import type { RootState } from './../app/store';
import { CategoryCardList } from '../features/categories/CategoryCardList';
import { Spin } from 'antd';

export const ProductsPage: FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [trigger, { data, isLoading }] = useLazyGetProductsQuery();
  const products = data?.data ?? [];

  useEffect(() => {
    if (token)
      trigger({
        categoryIds: ['69130fc28e877ac8a9c6ea42', '691410478e877ac8a9c6eb38'],
        sorting: { field: 'name', type: 'ASC' },
      });
  }, [token]);

  return (
    <div className={styles.page}>
      <Spin spinning={isLoading}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ marginRight: 15, width: 150 }}>
            <CategoryCardList
              readProducts={(categoryIds) => trigger({ categoryIds: categoryIds })}
            />
          </div>
          <ProductList products={products} />
        </div>
      </Spin>
    </div>
  );
};
