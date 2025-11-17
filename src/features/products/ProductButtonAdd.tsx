import type { FC } from 'react';
import { useState } from 'react';
import { Button } from 'antd';
import { ProductWindow } from './ProductWindow';

export const ProductButtonAdd: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Создать товар</Button>
      <ProductWindow isOpen={isModalOpen} closeFunc={() => setIsModalOpen(false)} type="create" />
    </>
  );
};
