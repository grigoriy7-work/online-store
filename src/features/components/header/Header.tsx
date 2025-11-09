import type { FC } from 'react';
import styles from './Header.module.css';

export const Header: FC = () => {
  return (
    <div className={[styles.header].join(' ')}>
      <h1>Интернет-магазин</h1>
    </div>
  );
};
