import type { FC } from 'react';
import { useState } from 'react';
import styles from './Page.module.css';
import { Button } from 'antd';
import { CategoryList } from './../features/categories/CategoryList';
import { CategoryWindow } from '../features/categories/CategoryWindow';

export const CategoriesPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.page}>
      <h2>Категории</h2>
      <div style={{ paddingBottom: 15 }}>
        <Button onClick={() => setIsModalOpen(true)}>Создать</Button>
      </div>

      <CategoryList />

      <CategoryWindow isOpen={isModalOpen} closeFunc={() => setIsModalOpen(false)} type="create" />
    </div>
  );
};
