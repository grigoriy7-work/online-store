import { type FC, useState } from 'react';
import styles from './Page.module.css';
import { Button, Modal, Form } from 'antd';
import { CategoryForm } from './../features/categories/CategoryForm';
import { CategoryList } from './../features/categories/CategoryList';
//import { useSearchParams } from 'react-router-dom';

export const SellerPage: FC = () => {
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);
  const [formCategory] = Form.useForm();
  //const [searchParams, setSearchParams] = useSearchParams();

  //const productId = searchParams.get('productId');
  //console.info('productId', productId);

  const showModalCategory = () => {
    setIsModalCategoryOpen(true);
  };

  const handleCategoryOk = () => {
    formCategory.submit();
    setIsModalCategoryOpen(false);
  };

  const handleCategoryCancel = () => {
    setIsModalCategoryOpen(false);
  };

  return (
    <div className={styles.page}>
      <h2>Кабинет продавца</h2>

      <div
        style={{
          border: '1px solid var(--background-color-header)',
          borderRadius: 5,
          padding: 15,
          display: 'none',
        }}
      >
        <Button onClick={showModalCategory}>Создать</Button>

        <CategoryList />
        <Modal
          title="Создание категории"
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={isModalCategoryOpen}
          onOk={handleCategoryOk}
          onCancel={handleCategoryCancel}
          okText="Создать"
          cancelText="Отмена"
        >
          <CategoryForm form={formCategory} />
        </Modal>
      </div>
    </div>
  );
};
