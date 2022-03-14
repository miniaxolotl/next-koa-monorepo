export type UserUniqueValues = {
  userId: string;
  email: string;
};

export type UserType = {
  email: string;
  password: string;
};

export type CreateUserType = {
  email: string;
  password: string;
  confirmPassword: string;
};
