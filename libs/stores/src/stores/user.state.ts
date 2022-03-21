import { atom } from 'recoil';

export type UserState = {
  userId: string | null;
  email: string | null;
};

export const userState = atom<UserState>({
  key: 'session',
  default: {
    userId: null,
    email: null,
  },
});
