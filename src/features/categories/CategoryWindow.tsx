import { type FC, useEffect } from 'react';
import { Modal, Form } from 'antd';
import { CategoryForm } from './CategoryForm';
import type { ParamsWithId } from '../../app/api/types/typesCategories';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from './categoryEndpoints';

export interface CategoryWindowProps {
  isOpen: boolean;
  closeFunc: () => void;
  selectedCategory?: ParamsWithId;
  type: 'create' | 'update';
}

export const CategoryWindow: FC<CategoryWindowProps> = ({
  isOpen,
  closeFunc,
  selectedCategory,
  type,
}) => {
  const [form] = Form.useForm<ParamsWithId>();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    if (selectedCategory) form.setFieldsValue(selectedCategory);
  }, [selectedCategory, form]);

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    closeFunc();
  };

  const categoryHandler = async (values: ParamsWithId) => {
    try {
      if (type == 'create') {
        await createCategory({ ...values }).unwrap();
      } else {
        if (selectedCategory?.id)
          await updateCategory({ ...values, id: selectedCategory.id }).unwrap();
      }
    } catch (error) {
      console.error('error create product', error);
    }
    closeFunc();
  };

  return (
    <Modal
      title={(type === 'create' ? 'Создание' : 'Обновление') + ' категории'}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Сохранить"
      cancelText="Отмена"
    >
      <CategoryForm form={form} categoryHandler={categoryHandler} />
    </Modal>
  );
};
