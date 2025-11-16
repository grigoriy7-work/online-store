import type { FC } from 'react';
import { useState } from 'react';
import { Button } from 'antd';
import { ProductWindow } from './ProductWindow';

export const ProductButtonAdd: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button onClick={showModal}>Создать</Button>
      <ProductWindow isOpen={isModalOpen} closeFunc={() => setIsModalOpen(false)} type="create" />
    </>
  );
};
