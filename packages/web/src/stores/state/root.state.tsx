import { useRef } from 'react';

import { RootStateType } from '@stores/StateProvider';
import { cookieStorage } from '@libs/utility/src/cookie-storage';

export type StateSelector = <T extends RootStateType, K = keyof T>(selector: K) => RootStateType[string];

export type RootStore<T> = {
  useState: StateSelector;
  useDispatch: (state: Partial<T>) => void;
};

export const useHydrate = <T,>({ defaultState, state, cookies }): RootStore<T> => {
  const _state: T = defaultState;
  for (const key of Reflect.ownKeys(defaultState)) {
    const persistedState = cookieStorage.getCookie(key);
    const _loadedState = JSON.parse(state[key] ?? null);
    const loadedState = _loadedState
      ? _loadedState[key]
      : cookies && persistedState
      ? JSON.parse(persistedState[key]) ?? defaultState[key]
      : defaultState[key];
    _state[key as keyof T] = loadedState;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storeRef = useRef(_state as any);
  return {
    useState: (selector) => storeRef.current[selector],
    useDispatch: (__state: Partial<T>) => {
      for (const __store in __state) {
        cookieStorage.setCookie(__store, JSON.stringify(__state[__store]));
        storeRef.current[__store] = {
          ...storeRef.current[__store],
          ..._state,
        };
      }
    },
  };
};
