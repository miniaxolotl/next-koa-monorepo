import { createContext, useCallback, useMemo } from 'react';
import fetch, { Response } from 'cross-fetch';

import { ClientConfig } from '@libs/config';
import { cookieStorage } from '@libs/utility';

export type HTTPMethodType = 'post' | 'get' | 'patch' | 'put' | 'delete';

export type FetchOptions = {
  method?: HTTPMethodType;
  headers?: { [key: string]: string };
  body?: string;
};

export type FetchInstance = (host: string, options: FetchOptions) => Promise<Response>;

export const FetchContext = createContext<FetchInstance>({} as FetchInstance);

export const FetchProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const token = useMemo(() => cookieStorage.getCookie('token'), []);
  const client = useCallback(
    (path, { method, headers, body }: FetchOptions) => {
      return fetch(`${ClientConfig.SERVER_HOST}${path}`, {
        method,
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
          ...headers,
        },
        body,
      });
    },
    [token],
  );
  return <FetchContext.Provider value={client}>{children}</FetchContext.Provider>;
};
