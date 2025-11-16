import { useEffect, type FC } from 'react';
import { Modal, Form } from 'antd';
import { ProductForm } from './ProductForm';
import { type RcFile } from 'antd/es/upload';
import type { Params, ParamsWithId } from '../../app/api/types/typesProducts';
import { useUploadFileMutation } from './../../app/api/baseEndpoints';
import { useCreateProductMutation, useUpdateProductMutation } from './productEndpoints';

export interface ProductWindowProps {
  isOpen: boolean;
  closeFunc: () => void;
  selectedProduct?: ParamsWithId;
}

export const ProductWindow: FC<ProductWindowProps> = ({ isOpen, closeFunc, selectedProduct }) => {
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
      //await createProduct({ ...values, photo: urlFile }).unwrap();
      if (selectedProduct?.id)
        await updateProduct({ ...values, photo: urlFile, id: selectedProduct.id }).unwrap();
    } catch (error) {
      console.error('error create product', error);
    }
    closeFunc();
  };

  return (
    <Modal
      title="Создание продукта"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Создать"
      cancelText="Отмена"
    >
      <ProductForm form={form} productHandler={addProduct} />
    </Modal>
  );
};
