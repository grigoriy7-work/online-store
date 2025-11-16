import type { FC } from 'react';
import { useState } from 'react';
import styles from './Page.module.css';
import { Button, Modal, Form } from 'antd';
import { CategoryForm } from './../features/categories/CategoryForm';
import { CategoryList } from './../features/categories/CategoryList';

export const CategoriesPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.page}>
      <h2>Категории</h2>
      <div style={{ paddingBottom: 15 }}>
        <Button onClick={showModal}>Создать</Button>
      </div>

      <CategoryList />
      <Modal
        title="Создание категории"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Создать"
        cancelText="Отмена"
      >
        <CategoryForm form={form} />
      </Modal>
    </div>
  );
};
