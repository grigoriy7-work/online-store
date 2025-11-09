import type { FC } from 'react';
import { memo } from 'react';
import { Input, Space, Button } from 'antd';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { /*useSignUpMutation,*/ useSignInMutation } from './authQuery';

type User = {
  email: string;
  password: string;
};

export const AuthForm: FC = memo(() => {
  const token = useSelector((state: RootState) => state.auth.token);
  //const [signUp] = useSignUpMutation();
  const [signIn] = useSignInMutation();

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
      await signIn(values);
    },
  });

  return (
    <div>
      <h2>Регистрация</h2>
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
    </div>
  );
});
