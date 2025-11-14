import { type FC, useEffect } from 'react';
import { List, Card, Checkbox } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from './../../app/store';
import { useLazyGetCategoriesQuery } from './../categories/categoryEndpoints';
import type { Category } from '../../app/api/types/typesCategories';
import type { CheckboxOptionType, GetProp } from 'antd';

export interface CategoriyCardProps {
  category: Category;
}

export const CategoryCard: FC<CategoriyCardProps> = ({ category }) => {
  return <Card hoverable title={category.name}></Card>;
};

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
  console.log('checked = ', checkedValues);
};

export const CategoryCardList: FC = () => {
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

  return (
    <div
      style={{
        padding: 15,
        border: '1px solid var(--background-color-header)',
        borderRadius: 10,
        marginBottom: 15,
      }}
    >
      <Checkbox.Group options={categoriesOptions} onChange={onChange} />
    </div>
  );
};
