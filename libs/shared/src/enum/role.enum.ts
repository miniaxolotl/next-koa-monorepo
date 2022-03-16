export const RoleEnum: {
  [key: string]: {
    role: string;
    authority: number;
  };
} = {
  DISABLED: {
    role: 'disabled',
    authority: 0,
  },
  DEVELOPER: {
    role: 'developer',
    authority: 1,
  },
  ADMIN: {
    role: 'admin',
    authority: 2,
  },
  MODERATOR: {
    role: 'moderator',
    authority: 3,
  },
  PRO_USER: {
    role: 'pro_user',
    authority: 4,
  },
  USER: {
    role: 'user',
    authority: 5,
  },
};
