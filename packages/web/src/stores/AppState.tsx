import { StateProvider, StateProviderProps, useRootDispatch, useRootState } from './StateProvider';

export enum AppStoreEnum {
  auth = 'AUTH',
  role = 'ROLE',
  user = 'USER',
}

export type AuthStore = {
  token: string;
};

export type RoleStore = {
  roles: string[];
};

export type UserStore = {
  id: string;
  username: string;
  email: string;
} | null;

type AppStateProps = {
  [AppStoreEnum.auth]: AuthStore;
  [AppStoreEnum.role]: RoleStore;
  [AppStoreEnum.user]: UserStore;
};

export const defaultAppState: AppStateProps = {
  [AppStoreEnum.auth]: {
    token: null,
  },
  [AppStoreEnum.role]: { roles: [] },
  [AppStoreEnum.user]: null,
};

export const AppState = (props: StateProviderProps<AppStateProps>) => StateProvider(props);

export const useStore = (selector: AppStoreEnum) => {
  return useRootState(selector);
};

export const useDispatch = <T extends AppStateProps>(selector: Partial<T>) => useRootDispatch<T>(selector);
