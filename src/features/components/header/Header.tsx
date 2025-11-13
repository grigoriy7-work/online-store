import type { FC } from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { ProfileButton, LoginButton } from '../buttons';
import { Space } from 'antd';

export const Header: FC = () => {
  return (
    <div className={[styles.header].join(' ')}>
      <NavLink to="/" className={styles['nav-link']}>
        <h1>Интернет-магазин</h1>
      </NavLink>
      <Space>
        <ProfileButton />
        <LoginButton />
      </Space>
    </div>
  );
};
