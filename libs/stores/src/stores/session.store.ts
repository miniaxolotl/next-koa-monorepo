import { atom, selector } from 'recoil';

import { localPersist } from '../hooks';

export type UserState = {
  userId: string | null;
  email: string | null;
};

export const createUserState = atom<UserState>({
  key: 'user',
  default: {
    userId: null,
    email: null,
  },
  effects: [localPersist],
});

export const userStore = {
  getRoles: selector({
    key: 'user.roles',
    get: ({ get: _get }) => {
      // do something
    },
  }),
};
