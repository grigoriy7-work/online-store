import type { FC } from 'react';
import { useEffect } from 'react';
import styles from './Page.module.css';
import { ProductList } from '../features/products/ProductList';
import { useLazyGetProductsQuery } from './../features/products/productEndpoints';
import { useSelector } from 'react-redux';
import type { RootState } from './../app/store';
import { ProductButtonAdd } from '../features/products/ProductButtonAdd';
import { CategoryCardList } from '../features/categories/CategoryCardList';

export const ProductsPage: FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [trigger, { data }] = useLazyGetProductsQuery();
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
      {false && <ProductButtonAdd />}
      <CategoryCardList readProducts={(categoryIds) => trigger({ categoryIds: categoryIds })} />
      <ProductList products={products} />
    </div>
  );
};
