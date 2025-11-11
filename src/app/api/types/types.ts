import type { ServerErrors } from './typesError';

export type SignUpBody = {
  email: string;
  password: string;
  commandId: string;
};

export type SignInBody = {
  email: string;
  password: string;
};

export type AuthResult = {
  token: string;
};

export interface ResultFetchAuth {
  authResult?: AuthResult;
  serverErrors?: ServerErrors;
}

export type Profile = {
  id: string;
  name: string;
  email: string;
  signUpDate: Date;
  commandId: string;
};

export type UpdateProfileBody = {
  name: string;
};

export type Filters = {
  name?: string;
  ids?: string[];
  pagination?: {
    pageSize?: number;
    pageNumber?: number;
  };
  createdAt?: {
    gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  };
  updatedAt?: {
    gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  };
  sorting?: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date';
  };
};
