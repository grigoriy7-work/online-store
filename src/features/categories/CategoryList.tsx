import type { FC } from 'react';
import { memo, useEffect, useState } from 'react';
import { List } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from './../../app/store';
import { useLazyGetCategoriesQuery } from './categoryEndpoints';
import { EditOutlined } from '@ant-design/icons';
import { CategoryWindow } from './CategoryWindow';
import type { Category, ParamsWithId } from '../../app/api/types/typesCategories';

export const CategoryList: FC = memo(() => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setselectedCategory] = useState<ParamsWithId | undefined>();
  const [trigger, { data }] = useLazyGetCategoriesQuery();
  const categories = data?.data ?? [];

  useEffect(() => {
    if (token) trigger({});
  }, [token]);

  const editCategoryHandler = (category: Category) => {
    setselectedCategory(category);
    setIsModalOpen(true);
  };

  return (
    <>
      <List
        header={<div>Все категории</div>}
        bordered
        dataSource={categories}
        renderItem={(category) => (
          <List.Item>
            <List.Item.Meta
              title={
                <>
                  {category.name} <EditOutlined onClick={() => editCategoryHandler(category)} />
                </>
              }
            />
          </List.Item>
        )}
      />
      <CategoryWindow
        isOpen={isModalOpen}
        closeFunc={() => setIsModalOpen(false)}
        selectedCategory={selectedCategory}
        type="update"
      />
    </>
  );
});
