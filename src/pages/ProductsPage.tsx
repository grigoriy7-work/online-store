import { type FC, useCallback, useEffect, useState, useRef } from 'react';
import styles from './Page.module.css';
import { ProductList } from '../features/products/ProductList';
import { useLazyGetProductsQuery } from './../features/products/productEndpoints';
import { useSelector } from 'react-redux';
import type { RootState } from './../app/store';
import { CategoryCardList } from '../features/categories/CategoryCardList';
import { Spin } from 'antd';
import { useScroll } from '../features/components/useScroll';
import type { Product } from '../app/types/typesProducts';

export const ProductsPage: FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [trigger, { data, isLoading }] = useLazyGetProductsQuery();
  let pageNumber = useRef(1);
  const pageSize = 12;
  const total = data?.pagination?.total ?? 0;
  const [hasMore, setHasMore] = useState(false);
  const categoryIdList = useRef<string[]>([]);

  useEffect(() => {
    setHasMore(pageNumber.current * pageSize < total);
  }, [pageNumber.current, pageSize, total]);

  const onLoadProducts = () => {
    if (token) {
      trigger({
        categoryIds: categoryIdList.current,
        sorting: { field: 'createdAt', type: 'DESC' },
        pagination: { pageSize: pageSize, pageNumber: pageNumber.current },
      });
    }
  };

  const lastElementRef = useScroll(
    isLoading,
    hasMore,
    useCallback(() => {
      pageNumber.current += 1;
      onLoadProducts();
    }, [categoryIdList]),
  );
  const [products, setProducts] = useState<Product[]>([]);
  const dataPage = data?.data ?? [];

  useEffect(() => {
    if (token) {
      onLoadProducts();
    }
  }, [token]);

  useEffect(() => {
    setProducts((prev) => {
      const map = new Map([...prev, ...dataPage].map((item) => [item.id, item]));
      return Array.from(map.values());
    });
  }, [data]);

  return (
    <div className={styles.page}>
      <Spin spinning={isLoading}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ marginRight: 15 }}>
            <CategoryCardList
              readProducts={(categoryIds) => {
                setProducts([]);
                pageNumber.current = 1;
                categoryIdList.current = categoryIds;
                onLoadProducts();
              }}
            />
          </div>
          <div>
            <ProductList products={products} lastElementRef={lastElementRef} />
          </div>
        </div>
      </Spin>
    </div>
  );
};
