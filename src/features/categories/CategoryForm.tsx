import type { FC } from 'react';
import { memo } from 'react';
import { Form, Input } from 'antd';
import type { FormInstance, FormProps } from 'antd';
import type { ParamsWithId } from '../../app/types/typesCategories';

interface CategoryFormProps {
  form: FormInstance<ParamsWithId>;
  categoryHandler: (values: ParamsWithId) => void;
}

export const CategoryForm: FC<CategoryFormProps> = memo(({ form, categoryHandler }) => {
  const onFinishHandler: FormProps<ParamsWithId>['onFinish'] = async (values) => {
    console.info('values', values);
    categoryHandler(values);
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
      <Form.Item<ParamsWithId>
        label="Наименование"
        name="name"
        rules={[{ required: true, message: 'Введите наименование!' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
});
