import { type FC, useEffect } from 'react';
import { Card, Checkbox, type GetProp, Space } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from './../../app/store';
import { useLazyGetCategoriesQuery } from './../categories/categoryEndpoints';
import type { Category } from '../../app/types/typesCategories';
import { ProductButtonAdd } from './../products/ProductButtonAdd';

export interface CategoriyCardProps {
  category: Category;
}

export const CategoryCard: FC<CategoriyCardProps> = ({ category }) => {
  return <Card hoverable title={category.name}></Card>;
};

interface CategoryCardListProps {
  readProducts: (categoryIds: string[]) => void;
}

export const CategoryCardList: FC<CategoryCardListProps> = ({ readProducts }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [trigger, { data }] = useLazyGetCategoriesQuery();
  const categories = data?.data ?? [];
  const categoriesOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));
  categoriesOptions.sort((a, b) => a.label.localeCompare(b.label));

  useEffect(() => {
    if (token) trigger({});
  }, [token]);

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
    readProducts(checkedValues as string[]);
  };

  return (
    <div
      style={{
        padding: 15,
        border: '1px solid var(--background-color-header)',
        borderRadius: 10,
        marginBottom: 15,
        width: 150,
      }}
    >
      <Space direction="vertical">
        <Checkbox.Group options={categoriesOptions} onChange={onChange} />

        {true && <ProductButtonAdd />}
      </Space>
    </div>
  );
};
