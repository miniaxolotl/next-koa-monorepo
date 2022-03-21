import fetch from 'cross-fetch';

import { ClientConfig } from '@libs/config';
import { createContext, useCallback, useContext, useState } from 'react';

export type HTTPMethodType = 'post' | 'get' | 'patch' | 'put' | 'delete';

export type FetchOptions = {
  method?: HTTPMethodType;
  headers?: { [key: string]: string };
  body?: string;
};

type FetchContextProps = {
  fetch: (path: string, { method, headers, body }: FetchOptions) => Promise<Response>;
  token: {
    IToken: string | undefined;
    setIToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  };
};

type StoreProviderProps = {
  children: React.ReactNode;
  token?: string;
};

export const FetchContext = createContext<FetchContextProps>({} as FetchContextProps);

export const FetchProvider = ({ children, token }: StoreProviderProps) => {
  const [IToken, setIToken] = useState(token);
  const IFetch = useCallback(
    (path: string, { method, headers, body }: FetchOptions) => {
      return fetch(`${ClientConfig.SERVER_HOST}${path}`, {
        method,
        headers: {
          ...(IToken ? { Authorization: `Bearer ${IToken}` } : {}),
          'Content-Type': 'application/json',
          ...headers,
        },
        body,
      });
    },
    [IToken],
  );
  return (
    <FetchContext.Provider
      value={{
        fetch: IFetch,
        token: { IToken, setIToken },
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

export const useGlobalFetch = () => {
  const { fetch, token } = useContext(FetchContext);
  const { IToken, setIToken } = token;

  const setToken = useCallback(
    (token: string) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      setIToken(token);
    },
    [setIToken],
  );

  return { setToken, token: IToken, fetch };
};

export const useFetch = ({ token }: { token?: string } = {}) => ({
  fetch: (path: string, { method, headers, body }: FetchOptions) =>
    fetch(`${ClientConfig.SERVER_HOST}${path}`, {
      method,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
        ...headers,
      },
      body,
    }),
});
