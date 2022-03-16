import { atom } from 'recoil';

import { cookiePersist } from '../hooks';

export const sessionState = atom<string | null>({
  key: 'session',
  default: null,
  effects: [cookiePersist],
});
