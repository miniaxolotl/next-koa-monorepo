export type UserUniqueValues = {
  id: number;
  userId: string;
  email: string;
};

export type UserType = {
  userId: string;
  email: string;
};

export type CreateUserType = {
  email: string;
  password: string;
  confirmPassword: string;
};
