import type { FC } from 'react';
import { LoginOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { NavLink } from 'react-router-dom';
import sytles from './Buttons.module.css';

export const LoginButton: FC = () => {
  return (
    <Space direction="vertical">
      <NavLink to="signin" className={sytles.link}>
        <LoginOutlined style={{ display: 'block', fontSize: 20 }} />
        Войти
      </NavLink>
    </Space>
  );
};
