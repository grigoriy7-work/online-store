import type { FC } from 'react';
import styles from './Header.module.css';
import { UserOutlined } from '@ant-design/icons';

import { useLazyGetProfileQuery } from './../../profile/profileEndpoints';
import { useSelector } from 'react-redux';
import type { RootState } from './../../../app/store';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const Header: FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [trigger, { data: profile }] = useLazyGetProfileQuery();

  useEffect(() => {
    if (token) trigger();
  }, [token]);

  return (
    <div className={[styles.header].join(' ')}>
      <NavLink to="/" className={styles['nav-link']}>
        <h1>Интернет-магазин</h1>
      </NavLink>
      <div style={{ paddingRight: 10 }}>
        <NavLink to="/profile" className={styles['nav-link']}>
          <UserOutlined style={{ display: 'block', fontSize: 20 }} />
          {profile?.name ?? profile?.email}
        </NavLink>
      </div>
    </div>
  );
};
