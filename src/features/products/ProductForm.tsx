import type { FC } from 'react';
import { memo, useEffect } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import type { FormInstance, FormProps } from 'antd';
import type { Params } from '../../app/api/types/typesProducts';
import { useSelector } from 'react-redux';
import type { RootState } from './../../app/store';
import { useLazyGetCategoriesQuery } from './../categories/categoryEndpoints';
import { useCreateProductMutation } from './productEndpoints';

interface ProductFormProps {
  form: FormInstance<any>;
}

export const ProductForm: FC<ProductFormProps> = memo(({ form }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [trigger, { data: categories }] = useLazyGetCategoriesQuery();
  const [createProduct] = useCreateProductMutation();

  const onFinishHandler: FormProps<Params>['onFinish'] = async (values) => {
    console.info('values', values);
    if (values.name) await createProduct(values);
  };

  const dataCategories =
    categories?.data.map((category) => ({
      value: category.id,
      label: category.name,
    })) ?? [];

  useEffect(() => {
    if (token) trigger({});
  }, [token]);

  const { TextArea } = Input;

  return (
    <Form
      form={form}
      name="product"
      initialValues={{ price: 1 }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinishHandler}
      autoComplete="off"
    >
      <Form.Item<Params>
        label="Наименование"
        name="name"
        rules={[{ required: true, message: 'Введите наименование!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<Params>
        label="Категория"
        name="categoryId"
        rules={[{ required: true, message: 'Выберите категорию!' }]}
      >
        <Select options={dataCategories} />
      </Form.Item>
      <Form.Item<Params>
        label="Цена"
        name="price"
        rules={[{ required: true, message: 'Укажите цену!' }]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item<Params> label="Описание" name="desc">
        <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
      </Form.Item>
      <Form.Item<Params> label="Фото" name="photo">
        <Input />
      </Form.Item>
    </Form>
  );
});
