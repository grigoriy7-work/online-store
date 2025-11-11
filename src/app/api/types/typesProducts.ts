import type { Category } from './typesCategories';

export type Params = {
  name: string;
  photo?: string;
  desc?: string;
  oldPrice?: number;
  price: number;
  categoryId: string;
};

export type Product = {
  id: string;
  name: string;
  photo?: string;
  desc?: string;
  createdAt: Date;
  updatedAt: Date;
  oldPrice?: number;
  price: number;
  commandId: string;
  category: Category;
};

export type ProductResult = {
  data: Product[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
  sorting: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name';
  };
};
