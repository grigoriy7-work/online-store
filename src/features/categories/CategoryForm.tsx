import type { FC } from 'react';
import { memo } from 'react';
import { Form, Input } from 'antd';
import type { FormInstance, FormProps } from 'antd';
import { useCreateCategoryMutation } from './categoryEndpoints';

type FieldType = {
  name: string;
  photo?: string;
};

interface CategoryFormProps {
  form: FormInstance<any>;
}

export const CategoryForm: FC<CategoryFormProps> = memo(({ form }) => {
  const [createCategory] = useCreateCategoryMutation();
  const onFinishHandler: FormProps<FieldType>['onFinish'] = async (values) => {
    if (values.name) await createCategory({ name: values.name });
  };

  return (
    <Form
      form={form}
      name="category"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinishHandler}
      autoComplete="off"
    >
      <Form.Item<FieldType> label="Наименование" name="name">
        <Input />
      </Form.Item>
      <Form.Item<FieldType> label="Фото" name="photo">
        <Input />
      </Form.Item>
    </Form>
  );
});
