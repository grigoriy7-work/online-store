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
