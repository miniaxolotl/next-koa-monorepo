import { cookieStorage } from '@libs/utility';

export const usePersist = (key: string) => {
  return {
    value: localStorage.getItem(key) ?? null,
    setValue: (value: string) => localStorage.setItem(key, value),
  };
};

export const localPersist = ({ onSet, setSelf, node }) => {
  if (typeof window === 'undefined') return;
  const storedData = localStorage.getItem(node.key);
  if (storedData != null) {
    setSelf(JSON.parse(storedData));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSet((newData: any, __: any, isReset: any) => {
    isReset ? localStorage.removeItem(node.key) : localStorage.setItem(node.key, JSON.stringify(newData));
  });
};

export const cookiePersist = ({ onSet, setSelf, node }) => {
  if (typeof window === 'undefined') return;
  const storedData = cookieStorage.getCookie(node.key);
  if (storedData != null) {
    setSelf(typeof storedData === 'string' ? storedData : JSON.parse(storedData));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSet((newData: any, __: any, isReset: any) => {
    isReset
      ? cookieStorage.setCookie(node.key, '')
      : cookieStorage.setCookie(node.key, typeof newData === 'string' ? newData : JSON.stringify(newData));
  });
};
