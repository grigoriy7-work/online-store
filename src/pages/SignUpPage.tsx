import type { FC } from 'react';
import { AuthForm } from '../features/auth/AuthForm';
import styles from './Page.module.css';

export const SignUpPage: FC = () => {
  return (
    <div className={styles.page}>
      <h2>Регистрация</h2>
      <AuthForm type="signUp" />
    </div>
  );
};
