import { createContext, useContext } from 'react';

import { RootStore, useHydrate } from './state/root.state';

// export type RootStateType = Record<string, unknown>;
export type RootStateType = { [key: string]: unknown };

export const RootContext = createContext<RootStore<RootStateType>>(null);

export interface StateProviderProps<StateType = RootStateType> {
  children: React.ReactNode;
  cookies: string;
  state?: StateType;
  defaultState: StateType;
}

export const StateProvider = ({ children, cookies, state, defaultState }: StateProviderProps) => {
  const store = useHydrate({ defaultState, state, cookies });
  return <RootContext.Provider value={store}>{children}</RootContext.Provider>;
};

export const useRootState = (selector: number | string) => {
  const store = useContext(RootContext);
  return store.useState(selector);
};

export const useRootDispatch = <T extends RootStateType>(state: Partial<T>) => {
  const store = useContext(RootContext) as RootStore<T>;
  return store.useDispatch(state);
};
