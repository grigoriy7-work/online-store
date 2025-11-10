import type { FC } from 'react';
import { memo, useEffect } from 'react';
import { Input, Space, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { useSignUpMutation, useSignInMutation } from './authQuery';
import type { ServerErrors } from './../../app/api/typesError';

type User = {
  email: string;
  password: string;
};

interface AuthFormProps {
  type: 'signIn' | 'signUp';
}

export const AuthForm: FC<AuthFormProps> = memo(({ type }) => {
  const [signUp, { isError: isErrorSignUp, error: errorSignUp }] = useSignUpMutation();
  const [signIn, { isError: isErrorSignIn, error: errorSignIn }] = useSignInMutation();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const serverError = errorSignUp as { status: number; data: ServerErrors };
    if (serverError) {
      if (serverError.data.errors.length > 0) {
        const firstError = serverError.data.errors[0];
        api.error({
          message: `Ошибка регистрации: ${firstError.name}`,
          description: firstError.message,
          placement: 'top',
        });
      }
    }
  }, [isErrorSignUp]);

  useEffect(() => {
    const serverError = errorSignIn as { status: number; data: ServerErrors };
    if (serverError) {
      if (serverError.data.errors.length > 0) {
        const firstError = serverError.data.errors[0];
        api.error({
          message: `Ошибка аутентификации: ${firstError.name}`,
          description: firstError.message,
          placement: 'top',
        });
      }
    }
  }, [isErrorSignIn]);

  const validate = (values: User) => {
    const errors: Partial<User> = {};
    if (!values.email) {
      errors.email = 'Обязательное поле';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Неправильный адрес электронной почты';
    }

    if (!values.password) {
      errors.password = 'Обязательное поле';
    } else if (values.password.length < 6) {
      errors.password = 'Пароль должен быть не менее 6 символов';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: 'admin@test.com',
      password: '123123',
    },
    validate,
    onSubmit: async (values) => {
      console.info('values', values);
      switch (type) {
        case 'signIn':
          await signIn(values);
          break;
        case 'signUp':
          await signUp({ ...values, commandId: import.meta.env.VITE_COMMANDID });
          break;
      }
    },
  });

  return (
    <>
      {contextHolder}
      <form onSubmit={formik.handleSubmit}>
        <Space direction="vertical" size="small">
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={'почта'}
          />
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
          <Input.Password
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={'пароль'}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}

          <Button htmlType="submit">Отправить</Button>
        </Space>
      </form>
    </>
  );
});
