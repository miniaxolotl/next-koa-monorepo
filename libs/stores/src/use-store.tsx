import { StoreApi, UseBoundStore } from 'zustand';
import { createContext, useContext } from 'react';

import { RootState, useHydrate } from './stores';

// type StoreContextProps = UseBoundStore<RootState, StoreApi<RootState>>;
type StoreContextProps = UseBoundStore<RootState, StoreApi<RootState>>;

type StoreProviderProps = {
  children: React.ReactNode;
  state?: string;
  cookies?: string;
};

export const StoreContext = createContext<StoreContextProps>({} as StoreContextProps);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  // const { token } = useFetch();
  const store = useHydrate();
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const store = useContext(StoreContext);
  return store((state) => state);
};
