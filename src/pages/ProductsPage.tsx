import type { FC } from 'react';
import { useEffect } from 'react';
import styles from './Page.module.css';
import { ProductList } from '../features/products/ProductList';
import { useLazyGetProductsQuery } from './../features/products/productEndpoints';
import { useSelector } from 'react-redux';
import type { RootState } from './../app/store';
import { ProductButtonAdd } from '../features/products/ProductButtonAdd';

export const ProductsPage: FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [trigger, { data }] = useLazyGetProductsQuery();
  const products = data?.data ?? [];

  useEffect(() => {
    if (token) trigger({});
  }, [token]);

  return (
    <div className={styles.page}>
      {false && <ProductButtonAdd />}
      <ProductList products={products} />
    </div>
  );
};
