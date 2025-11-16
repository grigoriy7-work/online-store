import type { FC } from 'react';
import { memo, useEffect } from 'react';
import { List } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from './../../app/store';
import { useLazyGetCategoriesQuery } from './categoryEndpoints';

export const CategoryList: FC = memo(() => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [trigger, { data }] = useLazyGetCategoriesQuery();
  const categories = data?.data ?? [];

  useEffect(() => {
    if (token) trigger({});
  }, [token]);

  return (
    <List
      header={<div>Все категории</div>}
      bordered
      dataSource={categories}
      renderItem={(category) => <List.Item>{category.name}</List.Item>}
    />
  );
});
