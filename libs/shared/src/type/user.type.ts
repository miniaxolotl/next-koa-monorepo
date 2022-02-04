export type UserUniqueValues = {
  userId: string;
  email: string;
  username: string;
};

export type UserType = {
  email: string;
  username: string;
  password: string;
};

export type CreateUserType = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};
