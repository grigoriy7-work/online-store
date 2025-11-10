import type { FC } from 'react';
import { AuthForm } from '../features/auth/AuthForm';
import styles from './Page.module.css';

export const SignInPage: FC = () => {
  return (
    <div className={styles.page}>
      <h2>Вход</h2>
      <AuthForm type="signIn" />
    </div>
  );
};
