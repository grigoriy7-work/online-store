import type { FC } from 'react';
import { memo, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { useLazyGetProfileQuery } from './profileEndpoints';
import { useSelector } from 'react-redux';
import type { RootState } from './../../app/store';
import { useUpdateProfileMutation } from './profileEndpoints';

type FieldType = {
  name?: string;
  email?: string;
  signUpDate?: Date;
};

export const ProfileForm: FC = memo(() => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [form] = Form.useForm();
  const [trigger, { data }] = useLazyGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (token) trigger();
  }, [token]);

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const onFinishHandler: FormProps<FieldType>['onFinish'] = async (values) => {
    if (values.name) await updateProfile({ name: values.name });
  };

  return (
    <Form
      form={form}
      name="profile"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ width: 500 }}
      initialValues={data}
      onFinish={onFinishHandler}
      autoComplete="off"
    >
      <Form.Item<FieldType> label="Имя" name="name">
        <Input />
      </Form.Item>
      <Form.Item<FieldType> label="Почта" name="email">
        <Input disabled />
      </Form.Item>
      <Form.Item<FieldType> label="Дата регистрации" name="signUpDate">
        <Input disabled />
      </Form.Item>
      <Form.Item label={null}>
        <Button htmlType="submit">Обновить</Button>
      </Form.Item>
    </Form>
  );
});
