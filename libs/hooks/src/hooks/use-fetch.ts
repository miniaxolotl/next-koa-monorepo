import fetch from 'cross-fetch';

import { ClientConfig } from '@libs/config';

export type HTTPMethodType = 'post' | 'get' | 'patch' | 'put' | 'delete';

export type FetchOptions = {
  method?: HTTPMethodType;
  headers?: { [key: string]: string };
  body?: string;
};

export const useFetch = ({ token }: { token?: string } = {}) => {
  return {
    fetch: (path: string, { method, headers, body }: FetchOptions) => {
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
  };
};
