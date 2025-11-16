import type { FC, ReactNode } from 'react';
import { Header } from '../header/Header';
import styles from './Layout.module.css';

export const Layout: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles['content-cover']}>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};
