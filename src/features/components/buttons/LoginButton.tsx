import type { FC } from 'react';
import { LoginOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import sytles from './Buttons.module.css';

export const LoginButton: FC = () => {
  return (
    <NavLink to="signin" className={sytles.link}>
      <LoginOutlined style={{ display: 'block', fontSize: '1.5em' }} />
      Войти
    </NavLink>
  );
};
