import { atom } from 'recoil';

export type SessionState = {
  sessionId: string | null;
};

export const sessionState = atom({
  key: 'session',
  default: { sessionId: null },
});
