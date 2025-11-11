import type { FC } from 'react';
import { useState } from 'react';
import styles from './Page.module.css';
import { Button, Modal, Form, Space } from 'antd';
import { ProductForm } from '../features/products/ProductForm';

export const ProductsPage: FC = () => {
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
      <h2>продукты</h2>
      <Space direction="vertical">
        <Button onClick={showModal}>Создать</Button>
      </Space>
      <Modal
        title="Создание продукта"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Создать"
        cancelText="Отмена"
      >
        <ProductForm form={form} />
      </Modal>
    </div>
  );
};
