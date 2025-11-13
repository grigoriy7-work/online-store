import type { FC } from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { ProfileButton } from '../buttons/ProfileButton';

export const Header: FC = () => {
  return (
    <div className={[styles.header].join(' ')}>
      <NavLink to="/" className={styles['nav-link']}>
        <h1>Интернет-магазин</h1>
      </NavLink>
      <div style={{ paddingRight: 10 }}>
        <ProfileButton />
      </div>
    </div>
  );
};
