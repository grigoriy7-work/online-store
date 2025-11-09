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

export type Category = {
  id: string;
  name: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
  commandId: string;
};
