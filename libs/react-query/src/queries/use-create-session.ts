import { AuthType } from '@libs/shared';
import { FetchInstance, HTTPMethodType } from '@libs/hooks';

export const useCreateSession = <T = { [key: string]: string }>(
  client: FetchInstance,
  options?: {
    body?: AuthType;
    method?: HTTPMethodType;
  },
) => {
  const { body, method } = options ?? {};
  return async (data?: AuthType) => {
    const response: Response = await client('/auth', {
      method: method ?? 'post',
      body: JSON.stringify(body ?? data ?? ''),
    });
    if (!response.ok) throw new Error(await response.text());
    return (await response.json()) as T;
  };
};
