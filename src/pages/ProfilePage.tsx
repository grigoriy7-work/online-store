import type { FC } from 'react';
import styles from './Page.module.css';
import { ProfileForm } from '../features/profile/ProfileForm';

export const ProfilePage: FC = () => {
  return (
    <div className={styles.page}>
      <h2>Профиль</h2>
      <ProfileForm />
    </div>
  );
};
