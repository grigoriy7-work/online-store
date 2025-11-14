import type { FC } from 'react';
import { useState } from 'react';
import { Button, Modal, Form } from 'antd';
import { ProductForm } from './ProductForm';

export const ProductButtonAdd: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

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
    <>
      <Button onClick={showModal}>Создать</Button>
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
    </>
  );
};
