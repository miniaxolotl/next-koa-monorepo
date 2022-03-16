import { MutableRefObject, createContext, useContext, useRef } from 'react';
import zustand, { GetState, SetState } from 'zustand';

import { FetchInstance, useFetch } from '@libs/hooks';

import { useCreateSessionStore } from './stores';

export type IRootStore = { fetch: FetchInstance } & {
  [key: string]: object | ReturnType<typeof useCreateSessionStore>;
};
type RootStore = ReturnType<typeof useCreateRootStore>;

type StoreProviderProps = {
  children: React.ReactNode;
  cookies: string;
};

const useCreateRootStore = ({ persistedState }) => {
  return {
    fetch: useFetch(),
    sessionStore: useCreateSessionStore({ persistedState }),
  };
};

export const StoreContext = createContext<MutableRefObject<RootStore>>({} as MutableRefObject<RootStore>);

// TODO: Persist State
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StoreProvider = ({ children, cookies }: StoreProviderProps) => {
  const rootStore = useCreateRootStore({ persistedState: null });
  const store = useRef(rootStore);
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const store = useContext(StoreContext);
  return store.current;
};
