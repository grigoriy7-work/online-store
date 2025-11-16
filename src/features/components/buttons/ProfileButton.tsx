import type { FC } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useLazyGetProfileQuery } from './../../profile/profileEndpoints';
import { useSelector } from 'react-redux';
import type { RootState } from './../../../app/store';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from '../../auth/authSlice';
import type { AppDispatch } from '../../../app/store';

export const ProfileButton: FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [trigger, { data: profile }] = useLazyGetProfileQuery();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) trigger();
  }, [token]);

  const items: MenuProps['items'] = [
    {
      key: 'provile',
      label: <NavLink to="/profile">Профиль</NavLink>,
    },
    {
      key: 'add-product',
      label: 'Добавить товар',
    },
    {
      key: 'categories',
      label: 'Категории',
    },
    {
      key: 'logout',
      label: 'Выйти',
      danger: true,
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'categories') {
      navigate('/categories');
    }

    if (key === 'logout') {
      dispatch(logout());
    }
  };

  return (
    <Dropdown menu={{ items, onClick }}>
      <a onClick={(e) => e.preventDefault()}>
        <>
          <UserOutlined
            style={{ display: 'block', fontSize: 20, color: 'var(--text-color-light)' }}
          />
          <span style={{ color: 'var(--text-color-light)' }}>
            {profile?.name ?? profile?.email}
          </span>
        </>
      </a>
    </Dropdown>
  );
};
