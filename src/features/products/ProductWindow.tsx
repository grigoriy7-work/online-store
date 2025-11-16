import { useEffect, type FC } from 'react';
import { Modal, Form } from 'antd';
import { ProductForm } from './ProductForm';
import { type RcFile } from 'antd/es/upload';
import type { ParamsWithId } from '../../app/api/types/typesProducts';
import { useUploadFileMutation } from './../../app/api/baseEndpoints';
import { useCreateProductMutation, useUpdateProductMutation } from './productEndpoints';

export interface ProductWindowProps {
  isOpen: boolean;
  closeFunc: () => void;
  selectedProduct?: ParamsWithId;
  type: 'create' | 'update';
}

export const ProductWindow: FC<ProductWindowProps> = ({
  isOpen,
  closeFunc,
  selectedProduct,
  type,
}) => {
  const [form] = Form.useForm<ParamsWithId>();
  const [uploadFile] = useUploadFileMutation();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (selectedProduct) form.setFieldsValue(selectedProduct);
  }, [selectedProduct, form]);

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    closeFunc();
  };

  /**создание товара */
  const addProduct = async (values: ParamsWithId, file?: RcFile) => {
    let urlFile: string | undefined;
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const responseUploadFile = await uploadFile(formData).unwrap();
        urlFile = responseUploadFile.url;
      } catch (error) {
        console.error('error create product', error);
        return;
      }
    }

    try {
      if (type == 'create') {
        await createProduct({ ...values, photo: urlFile }).unwrap();
      } else {
        if (selectedProduct?.id)
          await updateProduct({ ...values, photo: urlFile, id: selectedProduct.id }).unwrap();
      }
    } catch (error) {
      console.error('error create product', error);
    }
    closeFunc();
  };

  return (
    <Modal
      title={(type === 'create' ? 'Создание' : 'Обновление') + ' продукта'}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Сохранить"
      cancelText="Отмена"
    >
      <ProductForm form={form} productHandler={addProduct} />
    </Modal>
  );
};
