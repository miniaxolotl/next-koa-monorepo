import { IncomingMessage, ServerResponse } from 'http';

import { getCookie as getCookieNext, getCookies as getCookiesNext, setCookies as setCookiesNext } from 'cookies-next';

type Context = {
  res?: ServerResponse;
  req?: IncomingMessage & {
    cookies?:
      | {
          [key: string]: string;
        }
      | undefined;
  };
};

const getCookies = ({ context, options }: { context?: Context; options? } = {}) => {
  const cookies = getCookiesNext({
    res: context?.res,
    req: context?.req,
    maxAge: options && options.maxAge ? options.maxAge : 30 * 24 * 60 * 60,
    sameSite: options && options.sameSite ? options.sameSite : 'strict',
    secure: options && options.secure ? options.secure : true,
    path: options && options.path ? options.path : '/',
  });
  if (cookies) return cookies;
  return null;
};

const getCookie = (key, { context, options }: { context?: Context; options? } = {}) => {
  const cookies = getCookieNext(key, {
    res: context?.res,
    req: context?.req,
    maxAge: options && options.maxAge ? options.maxAge : 30 * 24 * 60 * 60,
    sameSite: options && options.sameSite ? options.sameSite : 'strict',
    secure: options && options.secure ? options.secure : true,
    path: options && options.path ? options.path : '/',
  });
  if (cookies) return cookies.toString();
  return null;
};

export const setCookie = (key, value, { context, options }: { context?: Context; options? } = {}) => {
  setCookiesNext(key, value, {
    res: context?.res,
    req: context?.req,
    maxAge: options && options.maxAge ? options.maxAge : 30 * 24 * 60 * 60,
    sameSite: options && options.sameSite ? options.sameSite : 'strict',
    secure: options && options.secure ? options.secure : true,
    path: options && options.path ? options.path : '/',
  });
};

export const cookieStorage = {
  getCookies,
  getCookie,
  setCookie,
};
