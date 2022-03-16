import { useCreateSessionStore } from './';

export const createRootStore = () => {
  return {
    sessionStore: useCreateSessionStore,
  };
};
