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
