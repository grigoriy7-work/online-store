import type { FC } from 'react';
import { memo, useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, Upload } from 'antd';
import type { FormInstance, FormProps } from 'antd';
import type { Params, ParamsWithId } from '../../app/api/types/typesProducts';
import { useSelector } from 'react-redux';
import type { RootState } from './../../app/store';
import { useLazyGetCategoriesQuery } from './../categories/categoryEndpoints';
import type { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload/interface';

const { Dragger } = Upload;

interface ProductFormProps {
  form: FormInstance<ParamsWithId>;
  productHandler: (values: ParamsWithId, file?: RcFile) => void;
}

export const ProductForm: FC<ProductFormProps> = memo(({ form, productHandler }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [trigger, { data: categories }] = useLazyGetCategoriesQuery();
  const [fileList, setFileList] = useState(Array<UploadFile>);

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    let newFileList = [...info.fileList];
    setFileList(newFileList);
  };

  const onFinishHandler: FormProps<ParamsWithId>['onFinish'] = async (values) => {
    const firstFile = fileList?.[0]?.originFileObj;
    productHandler(values, firstFile);
  };

  const dataCategories =
    categories?.data.map((category) => ({
      value: category.id,
      label: category.name,
    })) ?? [];

  useEffect(() => {
    if (token) trigger({});
  }, [token]);

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
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
      </Form.Item>
      <Form.Item<Params>
        label="Фото"
        rules={[{ required: true, message: 'Пожалуйста, выберите файл!' }]}
      >
        <Dragger
          beforeUpload={() => false}
          maxCount={1}
          fileList={fileList}
          onChange={handleChange}
        ></Dragger>
      </Form.Item>
    </Form>
  );
});
