import { SetterOrUpdater, atom, selector, useRecoilState } from 'recoil';

import { useFetch } from '@libs/hooks';
import { AuthType, CreateUserType } from '@libs/shared';

import { cookiePersist } from '../hooks';

export type SessionState = {
  sessionId: string | null;
  userId: string | null;
};

export const createSessionState = atom<SessionState>({
  key: 'session',
  default: {
    sessionId: null,
    userId: null,
  },
  effects: [cookiePersist],
});
