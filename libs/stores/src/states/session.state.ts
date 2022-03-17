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

// const useRegister = selector({
//   key: 'session.register',
//   get: ({ get }) => {
//     // do something
//   },
// });

export const useLogin = async (setSession: SetterOrUpdater<SessionState>, data: AuthType) => {
  const { fetch } = useFetch();
  const response = await fetch('/auth', {
    method: 'post',
    body: JSON.stringify(data),
  });
  if (response.ok) {
    setSession(await response.json());
  } else {
    throw new Error(response.statusText);
  }
};
export const useRegister = async (setSession: SetterOrUpdater<SessionState>, data: CreateUserType) => {
  const { fetch } = useFetch();
  const response = await fetch('/user', {
    method: 'post',
    body: JSON.stringify(data),
  });
  if (response.ok) {
    setSession(await response.json());
  } else {
    throw new Error(response.statusText);
  }
};
