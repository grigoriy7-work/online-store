import type { FC } from 'react';
import { useState } from 'react';
import { Button, Modal, Form } from 'antd';
import { ProductForm } from './ProductForm';
import { useCreateProductMutation, useUpdateProductMutation } from './productEndpoints';
import { useUploadFileMutation } from './../../app/api/baseEndpoints';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import type { ParamsWithId } from '../../app/api/types/typesProducts';
import type { RcFile } from 'antd/es/upload/interface';

export const ProductButtonAdd: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [uploadFile] = useUploadFileMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
    //if (form.getFieldError.length == 0) setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const productHandler = async (values: ParamsWithId, file?: RcFile) => {
    let fileUrl: string | undefined;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const responseUploadFile = await uploadFile(formData).unwrap();
        fileUrl = responseUploadFile.url;
      } catch (error) {
        console.error('error create product', error);
      }
    }

    try {
      //await createProduct({ ...values, photo: fileUrl }).unwrap();
      await updateProduct({ ...values, photo: fileUrl }).unwrap();
    } catch (error) {
      console.error('error create product', error);
    }

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
        <ProductForm form={form} productHandler={productHandler} />
      </Modal>
    </>
  );
};
