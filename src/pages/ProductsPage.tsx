import type { FC } from 'react';
import { useState, useEffect } from 'react';
import styles from './Page.module.css';
import { Button, Modal, Form, Space } from 'antd';
import { ProductForm } from '../features/products/ProductForm';
import { ProductList } from '../features/products/ProductList';
import { useLazyGetProductsQuery } from './../features/products/productEndpoints';
import { useSelector } from 'react-redux';
import type { RootState } from './../app/store';

export const ProductsPage: FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [trigger, { data }] = useLazyGetProductsQuery();
  const products = data?.data ?? [];

  useEffect(() => {
    if (token) trigger({});
  }, [token]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
    if (form.getFieldError.length == 0) setIsModalOpen(false);
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

      <ProductList products={products} />

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
