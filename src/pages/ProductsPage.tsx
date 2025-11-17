import { type FC, useEffect, useState } from 'react';
import styles from './Page.module.css';
import { ProductList } from '../features/products/ProductList';
import { useLazyGetProductsQuery } from './../features/products/productEndpoints';
import { useSelector } from 'react-redux';
import type { RootState } from './../app/store';
import { CategoryCardList } from '../features/categories/CategoryCardList';
import { Spin, Pagination } from 'antd';

export const ProductsPage: FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [pageNumber, setPageNumber] = useState(1);
  const [trigger, { data, isLoading }] = useLazyGetProductsQuery();
  const products = data?.data ?? [];
  const pageSize = 12;

  useEffect(() => {
    if (token)
      trigger({
        sorting: { field: 'createdAt', type: 'DESC' },
        pagination: { pageSize: pageSize, pageNumber: pageNumber },
      });
  }, [token, pageNumber]);

  return (
    <div className={styles.page}>
      <Spin spinning={isLoading}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ marginRight: 15 }}>
            <CategoryCardList
              readProducts={(categoryIds) => {
                trigger({
                  categoryIds: categoryIds,
                  pagination: { pageSize: pageSize, pageNumber: pageNumber },
                });
              }}
            />
          </div>
          <div>
            <ProductList products={products} />
            <Pagination
              current={pageNumber}
              onChange={(page) => setPageNumber(page)}
              defaultPageSize={pageSize}
              total={data?.pagination?.total}
            />
          </div>
        </div>
      </Spin>
    </div>
  );
};
